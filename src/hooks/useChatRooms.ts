// src/hooks/useChatRooms.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  role: "student" | "tutor";
  nickname: string;
  profile_image?: string;
}

export interface ChatItem {
  id: string;
  match_id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  unreadCount: number;
  avatar: string;
}

interface ProfileResponse {
  nickname: string;
  profile_image?: string;
}

interface StudentMemberResponse {
  id: string;
  profiles: ProfileResponse | ProfileResponse[] | null;
}

interface TutorMemberResponse {
  id: string;
  profile_image?: string;
  profiles: ProfileResponse | ProfileResponse[] | null;
}

interface MatchResponse {
  id: string;
  student_id: string;
  tutor_id: string;
  students: StudentMemberResponse | StudentMemberResponse[] | null;
  tutors: TutorMemberResponse | TutorMemberResponse[] | null;
}

interface MessageResponse {
  content: string;
  created_at: string;
  sender_id: string;
}

interface ChatRoomResponse {
  id: string;
  match_id: string;
  created_at: string;
  student_last_read_at?: string | null;
  tutor_last_read_at?: string | null;
  matches: MatchResponse;
  messages: MessageResponse | MessageResponse[] | null;
}

export function useChatRooms() {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. 유저 정보 조회
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
          if (isMounted) setCurrentUser(null);
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, email, role, nickname, profile_image")
          .eq("id", user.id)
          .single();

        if (!profileError && profileData && isMounted) {
          setCurrentUser(profileData as UserProfile);
        }
      } catch (err) {
        console.error("유저 정보 조회 에러:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchUserData();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  // 2. 채팅방 목록을 조회하고 가공하는 공통 함수 (useCallback으로 최적화)
  const fetchChatRooms = useCallback(async () => {
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from("chat_rooms")
        .select(
          `
          id,
          match_id,
          created_at,
          matches!inner (
            id,
            student_id,
            tutor_id,
            students ( id, profiles ( nickname, profile_image ) ),
            tutors ( id, profile_image, profiles ( nickname ) ) 
          ),
          student_last_read_at,
          tutor_last_read_at,
          messages!room_id (  
            content,
            created_at,
            sender_id
          )
        `,
        )
        .or(`student_id.eq.${currentUser.id},tutor_id.eq.${currentUser.id}`, {
          referencedTable: "matches",
        });

      if (error) {
        console.error(
          "🚨 [실제 DB/쿼리 에러 발생]:",
          error.message,
          error.code,
        );
        setChats([]);
        return;
      }

      if (!data || data.length === 0) {
        setChats([]);
        return;
      }

      const rawRooms = data as unknown as ChatRoomResponse[];
      const formattedChats: ChatItem[] = rawRooms.map((room) => {
        const match = room.matches;
        const isMeStudent = match.student_id === currentUser.id;

        let partnerName = "상대방";
        let partnerAvatar = "";

        if (isMeStudent) {
          const rawTutor = match.tutors;
          const tutorMember = Array.isArray(rawTutor) ? rawTutor[0] : rawTutor;
          const rawProfiles = tutorMember?.profiles;
          const tutorProfile = Array.isArray(rawProfiles)
            ? rawProfiles[0]
            : rawProfiles;

          partnerName = tutorProfile?.nickname ?? "튜터";
          partnerAvatar = tutorMember?.profile_image ?? "";
        } else {
          const rawStudent = match.students;
          const studentMember = Array.isArray(rawStudent)
            ? rawStudent[0]
            : rawStudent;
          const rawProfiles = studentMember?.profiles;
          const studentProfile = Array.isArray(rawProfiles)
            ? rawProfiles[0]
            : rawProfiles;

          partnerName = studentProfile?.nickname ?? "학생";
          partnerAvatar = studentProfile?.profile_image ?? "";
        }

        const rawMessages = room.messages;
        const messageList: MessageResponse[] = Array.isArray(rawMessages)
          ? rawMessages
          : rawMessages
            ? [rawMessages]
            : [];

        const sortedMessages = messageList.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        const latestMessage = sortedMessages[0];

        let displayMessage = "대화 내용이 없습니다.";
        if (latestMessage?.content) {
          if (latestMessage.content.startsWith("[파일]")) {
            displayMessage = "사진 또는 파일을 전송했습니다.";
          } else {
            displayMessage = latestMessage.content;
          }
        }

        let displayTime = "";
        if (latestMessage?.created_at) {
          const date = new Date(latestMessage.created_at);
          displayTime = `${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        }

        const myLastReadAt = isMeStudent
          ? room.student_last_read_at
          : room.tutor_last_read_at;

        let unreadCount = 0;
        if (messageList.length > 0) {
          unreadCount = messageList.filter((msg) => {
            const isSenderMe = msg.sender_id === currentUser.id;
            const isAfterRead = myLastReadAt
              ? new Date(msg.created_at).getTime() >
                new Date(myLastReadAt).getTime()
              : true;
            return !isSenderMe && isAfterRead;
          }).length;
        }

        return {
          id: room.id,
          match_id: room.match_id,
          name: partnerName,
          role: isMeStudent ? "Tutor" : "Student",
          lastMessage: displayMessage,
          time: displayTime,
          unread: unreadCount > 0,
          unreadCount: unreadCount,
          avatar: partnerAvatar,
        };
      });

      setChats(formattedChats);
    } catch (err) {
      console.error("채팅방 목록 처리 중 에러:", err);
    }
  }, [currentUser, supabase]);

  // 3. 최초 진입 시 및 activeChatId가 바뀔 때(읽음 처리 반영 위해) 채팅방 목록 재조회
  useEffect(() => {
    if (!currentUser) return;

    // 💡 렌더링 주기와 겹치지 않도록 미세한 비동기 틱(Microtask/Macrotask)으로 분리
    const timer = setTimeout(() => {
      void fetchChatRooms();
    }, 0);

    return () => clearTimeout(timer);
  }, [currentUser, activeChatId, fetchChatRooms]);

  // 4. 💡 Supabase Realtime 구독: 새 메시지나 읽음 상태 변화 감지 시 목록 자동 갱신
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel("public-chat-rooms-changes")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, UPDATE 등 모든 변경 감지
          schema: "public",
          table: "messages",
        },
        () => {
          void fetchChatRooms(); // 메시지 변동 시 목록 새로고침
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_rooms",
        },
        () => {
          void fetchChatRooms(); // 읽음 시간(last_read_at) 갱신 시 목록 새로고침
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [currentUser, supabase, fetchChatRooms]);

  return {
    currentUser,
    chats,
    activeChatId,
    setActiveChatId,
    loading,
  };
}
