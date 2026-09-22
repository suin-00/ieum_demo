// src/hooks/useChatMessages.ts
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

interface ChatRoomReadStatus {
  student_last_read_at: string | null;
  tutor_last_read_at: string | null;
  matches:
    | {
        student_id: string;
        tutor_id: string;
      }
    | {
        student_id: string;
        tutor_id: string;
      }[]
    | null;
}

export function useChatMessages(
  activeChatId: string | null,
  currentUser: UserProfile | null,
) {
  const supabase = createClient();
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // 메시지 포맷팅 및 읽음 상태 계산 헬퍼 함수
  const formatMessages = useCallback(
    (
      rawMessages: MessageResponse[],
      roomInfo: ChatRoomReadStatus | null,
    ): MessageItem[] => {
      if (!currentUser || !roomInfo || !roomInfo.matches) {
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
      }

      const matchData = Array.isArray(roomInfo.matches)
        ? roomInfo.matches[0]
        : roomInfo.matches;

      if (!matchData) {
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
      }

      const isMeStudent = matchData.student_id === currentUser.id;
      // 내가 학생이면 튜터의 읽은 시간을, 내가 튜터이면 학생의 읽은 시간을 상대방의 읽은 시간으로 잡습니다.
      const partnerLastReadAt = isMeStudent
        ? roomInfo.tutor_last_read_at
        : roomInfo.student_last_read_at;

      return rawMessages.map((msg) => {
        const isSenderMe = msg.sender_id === currentUser.id;

        // 상대방이 이 메시지 생성 이후에 채팅방을 읽었는지 검증
        let isReadByPartner = false;
        if (partnerLastReadAt) {
          const msgTime = new Date(msg.created_at).getTime();
          const readTime = new Date(partnerLastReadAt).getTime();
          // 상대방의 마지막 읽은 시간이 메시지 생성 시간 이후이거나 같으면 읽은 것으로 판단
          isReadByPartner = readTime >= msgTime;
        }

        const calculatedRead = isSenderMe ? isReadByPartner : true;

        return {
          id: msg.id,
          sender: isSenderMe ? "user" : "tutor",
          text: msg.content,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          read: calculatedRead,
        };
      });
    },
    [currentUser],
  );

  // 1. 메시지 및 채팅방 읽음 정보 조회 함수
  const fetchMessagesAndRoom = useCallback(async () => {
    if (!activeChatId || !currentUser) return;

    try {
      const [msgResult, roomResult] = await Promise.all([
        supabase
          .from("messages")
          .select("*")
          .eq("room_id", activeChatId)
          .order("created_at", { ascending: true }),
        supabase
          .from("chat_rooms")
          .select(
            `
            student_last_read_at,
            tutor_last_read_at,
            matches (
              student_id,
              tutor_id
            )
          `,
          )
          .eq("id", activeChatId)
          .single(),
      ]);

      if (msgResult.error) {
        console.error("메시지 조회 실패:", msgResult.error.message);
        return;
      }

      const rawMessages = (msgResult.data || []) as MessageResponse[];
      const roomInfo = (roomResult.data || null) as ChatRoomReadStatus | null;

      setMessages(formatMessages(rawMessages, roomInfo));
    } catch (err) {
      console.error("메시지 조회 중 에러:", err);
    }
  }, [activeChatId, currentUser, supabase, formatMessages]);

  // 2. 최초 진입 및 activeChatId 변경 시 조회 + 실시간 구독 설정
  useEffect(() => {
    if (!activeChatId || !currentUser) {
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchMessagesAndRoom();
      }
    };

    void loadData();

    // Supabase Realtime 채널 구독 설정 (메시지 추가 및 읽음 시간 변경 감지)
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
        () => {
          void fetchMessagesAndRoom();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_rooms",
          filter: `id=eq.${activeChatId}`,
        },
        () => {
          void fetchMessagesAndRoom();
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, [activeChatId, currentUser, supabase, fetchMessagesAndRoom]);

  // 3. 메시지 전송 함수 (낙관적 업데이트 적용)
  const sendMessage = async (content: string) => {
    if (!activeChatId || !currentUser || !content.trim()) return;

    const trimmedContent = content.trim();
    const tempId = `temp_${Date.now()}`;

    const optimisticMessage: MessageItem = {
      id: tempId,
      sender: "user",
      text: trimmedContent,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false, // 내가 막 보낸 메시지는 아직 상대가 안 읽었으므로 확실하게 false 처리
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
      } else if (data) {
        void fetchMessagesAndRoom();
      }
    } catch (err) {
      console.error("메시지 전송 중 에러:", err);
    }
  };

  // 4. 파일 업로드 및 전송 함수
  const sendFileMessage = async (file: File) => {
    if (!activeChatId || !currentUser) return;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${activeChatId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("chat-files")
        .upload(filePath, file);

      if (uploadError) {
        console.error("파일 업로드 실패:", uploadError.message);
        alert("파일 업로드에 실패했습니다.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("chat-files")
        .getPublicUrl(filePath);

      const fileUrl = publicUrlData.publicUrl;

      await sendMessage(`[파일] ${file.name}:::${fileUrl}`);
    } catch (err) {
      console.error("파일 전송 중 에러:", err);
    }
  };

  return {
    messages,
    sendMessage,
    sendFileMessage,
  };
}
