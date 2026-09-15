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
    // 💡 setState를 부르지 않고 그냥 안전하게 return!
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
          setMessages((prev) => [...prev, formatMessages([newMsg])[0]]);
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, [activeChatId, currentUser, supabase, formatMessages]);

  // 2. 메시지 전송 함수
  const sendMessage = async (content: string) => {
    if (!activeChatId || !currentUser || !content.trim()) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          room_id: activeChatId,
          sender_id: currentUser.id,
          content: content.trim(),
        },
      ]);

      if (error) {
        console.error("메시지 전송 실패:", error);
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
