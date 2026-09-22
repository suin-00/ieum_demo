"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "./useChatRooms";

export interface MessageItem {
  id: string;
  sender: "user" | "tutor";
  text: string;
  time: string;
  read: boolean;
}

interface MessageResponse {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export function useChatMessages(
  activeChatId: string | null,
  currentUser: UserProfile | null,
) {
  const supabase = createClient();
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // 메시지 포맷팅 헬퍼 함수
  const formatMessages = useCallback(
    (rawMessages: MessageResponse[]): MessageItem[] => {
      return rawMessages.map((msg) => ({
        id: msg.id,
        sender: msg.sender_id === currentUser?.id ? "user" : "tutor",
        text: msg.content,
        time: new Date(msg.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: true,
      }));
    },
    [currentUser],
  );

  // 1. 메시지 조회 및 실시간 구독 설정
  useEffect(() => {
    if (!activeChatId || !currentUser) {
      return;
    }

    let isMounted = true;

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("room_id", activeChatId)
          .order("created_at", { ascending: true });

        if (error || !data || !isMounted) {
          console.error("메시지 조회 실패:", error?.message);
          return;
        }

        if (isMounted) {
          setMessages(formatMessages(data as unknown as MessageResponse[]));
        }
      } catch (err) {
        console.error("메시지 조회 중 에러:", err);
      }
    };

    void loadMessages();

    // 💡 Supabase Realtime 채널 구독 설정
    const channel = supabase
      .channel(`room_${activeChatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${activeChatId}`,
        },
        (payload) => {
          const newMsg = payload.new as MessageResponse;
          const formatted = formatMessages([newMsg])[0];

          // 💡 중복 추가 방지 (낙관적 업데이트로 먼저 추가된 아이디가 있다면 무시)
          setMessages((prev) => {
            if (prev.some((m) => m.id === formatted.id)) {
              return prev;
            }
            return [...prev, formatted];
          });
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, [activeChatId, currentUser, supabase, formatMessages]);

  // 2. 메시지 전송 함수 (낙관적 업데이트 적용)
  const sendMessage = async (content: string) => {
    if (!activeChatId || !currentUser || !content.trim()) return;

    const trimmedContent = content.trim();
    const tempId = `temp_${Date.now()}`; // 임시 ID 생성

    // 💡 [핵심] 전송 버튼을 누르는 순간 내 화면에 즉시 반영 (새로고침 불필요)
    const optimisticMessage: MessageItem = {
      id: tempId,
      sender: "user",
      text: trimmedContent,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            room_id: activeChatId,
            sender_id: currentUser.id,
            content: trimmedContent,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("메시지 전송 실패:", error);
        // 실패 시 임시 메시지 제거 등 예외 처리 가능
      } else if (data) {
        // DB에 정상 저장된 진짜 데이터의 ID로 임시 ID 교체
        const realMsg = formatMessages([data as MessageResponse])[0];
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? realMsg : msg)),
        );
      }
    } catch (err) {
      console.error("메시지 전송 중 에러:", err);
    }
  };

  return {
    messages,
    sendMessage,
  };
}
