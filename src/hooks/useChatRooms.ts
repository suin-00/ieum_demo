"use client";

import { useState, useEffect } from "react";
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
  avatar: string;
}

interface ProfileResponse {
  nickname: string;
  profile_image?: string;
}

interface MemberResponse {
  id: string;
  profiles: ProfileResponse | ProfileResponse[] | null;
}

interface MatchResponse {
  id: string;
  student_id: string;
  tutor_id: string;
  students: MemberResponse | MemberResponse[] | null;
  tutors: MemberResponse | MemberResponse[] | null;
}

interface ChatRoomResponse {
  id: string;
  match_id: string;
  created_at: string;
  matches: MatchResponse;
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

  // 2. 채팅방 목록 조회
  useEffect(() => {
    if (!currentUser) return;
    let isMounted = true;

    const fetchChatRooms = async () => {
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
              tutors ( id, profiles ( nickname, profile_image ) )
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
          if (isMounted) setChats([]);
          return;
        }

        if (!data || data.length === 0 || !isMounted) {
          setChats([]);
          return;
        }

        const rawRooms = data as unknown as ChatRoomResponse[];
        const formattedChats: ChatItem[] = rawRooms.map((room) => {
          const match = room.matches;
          const isMeStudent = match.student_id === currentUser.id;
          const rawPartner = isMeStudent ? match.tutors : match.students;
          const member = Array.isArray(rawPartner) ? rawPartner[0] : rawPartner;
          const rawProfiles = member?.profiles;
          const partnerProfile = Array.isArray(rawProfiles)
            ? rawProfiles[0]
            : rawProfiles;

          return {
            id: room.id,
            match_id: room.match_id,
            name: partnerProfile?.nickname ?? "상대방",
            role: isMeStudent ? "Tutor" : "Student",
            lastMessage: "대화 내용이 없습니다.",
            time: "",
            unread: false,
            avatar: partnerProfile?.profile_image ?? "",
          };
        });

        setChats(formattedChats);
      } catch (err) {
        console.error("채팅방 목록 처리 중 에러:", err);
      }
    };

    void fetchChatRooms();
    return () => {
      isMounted = false;
    };
  }, [currentUser, supabase]);

  return {
    currentUser,
    chats,
    activeChatId,
    setActiveChatId,
    loading,
  };
}
