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
      const partnerLastReadAt = isMeStudent
        ? roomInfo.tutor_last_read_at
        : roomInfo.student_last_read_at;

      return rawMessages.map((msg) => {
        const isSenderMe = msg.sender_id === currentUser.id;

        let isReadByPartner = false;
        if (partnerLastReadAt) {
          // 💡 양쪽 모두 getTime() 밀리초 숫자로 정확히 변환하여 비교
          const msgTime = new Date(msg.created_at).getTime();
          const readTime = new Date(partnerLastReadAt).getTime();

          // 상대방이 읽은 시각이 메시지 생성 시각과 같거나 그 이후라면 읽음 처리
          isReadByPartner = readTime >= msgTime;
        }

        // 내가 보낸 메시지일 때만 상대방의 읽음 여부를 반영하고, 상대가 보낸 건 내 화면에서 항상 true
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

      // 💡 이 로그를 찍어보세요!
      console.log("📊 [현재 가져온 룸 읽음 정보]:", {
        studentRead: roomInfo?.student_last_read_at,
        tutorRead: roomInfo?.tutor_last_read_at,
        matchData: roomInfo?.matches,
      });

      setMessages(formatMessages(rawMessages, roomInfo));
    } catch (err) {
      console.error("메시지 조회 중 에러:", err);
    }
  }, [activeChatId, currentUser, supabase, formatMessages]);

  // 2. 진입 시 조회 + 실시간 구독 + 2초 간격 자동 새로고침(폴링) 결합
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

    // 💡 2초 간격 자동 새로고침으로 '1'이 방에 켜둔 상태에서도 자동으로 사라지도록 보장
    const pollInterval = setInterval(() => {
      if (isMounted) {
        void fetchMessagesAndRoom();
      }
    }, 2000);

    // 브라우저 탭 포커스 시 자동 동기화
    const handleFocus = () => {
      void fetchMessagesAndRoom();
    };
    window.addEventListener("focus", handleFocus);

    // Supabase Realtime 채널 구독 (새 메시지 즉시 수신)
    const channel = supabase
      .channel(`public:room_${activeChatId}`)
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
      .subscribe();

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      window.removeEventListener("focus", handleFocus);
      void supabase.removeChannel(channel);
    };
  }, [activeChatId, currentUser, supabase, fetchMessagesAndRoom]);

  // 3. 메시지 전송 함수 (낙관적 업데이트)
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
      read: false,
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
