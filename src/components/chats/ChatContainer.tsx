// src/components/chats/ChatContainer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatInfo from "./ChatInfo";
import { useChatRooms } from "@/hooks/useChatRooms";
import { createClient } from "@/lib/supabase/client";

const UNIFIED_IMAGE_URL = "/images/unified_profile.png";

interface MessageItem {
  id: string;
  sender: "user" | "tutor";
  text: string;
  time: string;
  read: boolean;
  images?: string[];
}

interface SupabaseMessageRecord {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface SupabaseRoomRecord {
  student_last_read_at: string | null;
  tutor_last_read_at: string | null;
}

export default function ChatContainer() {
  const router = useRouter();
  const supabase = createClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const { currentUser, chats, activeChatId, setActiveChatId } = useChatRooms();
  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  const [messages, setMessages] = useState<MessageItem[]>([]);

  // 메시지 로드 및 실시간 구독 설정
  // 💡 useEffect 내부에서는 setMessages([])를 호출하지 않고 return만 수행
  useEffect(() => {
    if (!activeChatId || !currentUser) {
      return;
    }

    const fetchAndMarkRead = async () => {
      const isStudent = currentUser.role === "student";
      const columnName = isStudent
        ? "student_last_read_at"
        : "tutor_last_read_at";

      await supabase
        .from("chat_rooms")
        .update({ [columnName]: new Date().toISOString() })
        .eq("id", activeChatId);

      const { data: msgData, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", activeChatId)
        .order("created_at", { ascending: true });

      if (error || !msgData) {
        setMessages([]);
        return;
      }

      const { data: roomData } = await supabase
        .from("chat_rooms")
        .select("student_last_read_at, tutor_last_read_at")
        .eq("id", activeChatId)
        .single();

      const typedRoomData = roomData as SupabaseRoomRecord | null;
      const myLastReadAt = isStudent
        ? typedRoomData?.student_last_read_at
        : typedRoomData?.tutor_last_read_at;

      const typedMsgData = msgData as SupabaseMessageRecord[];

      const formattedMessages: MessageItem[] = typedMsgData.map((msg) => {
        const isSenderMe = msg.sender_id === currentUser.id;
        const msgTime = new Date(msg.created_at);

        let isRead = true;
        if (!isSenderMe) {
          if (myLastReadAt) {
            // 💡 밀리초 오차를 방지하기 위해 1초(1000ms)의 버퍼를 두고 비교하거나 안전하게 처리
            const msgTimeMs = msgTime.getTime();
            const readTimeMs = new Date(myLastReadAt).getTime();
            isRead = msgTimeMs <= readTimeMs;
          } else {
            isRead = false;
          }
        }

        const timeStr = `${msgTime.getHours().toString().padStart(2, "0")}:${msgTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        return {
          id: msg.id,
          sender: isSenderMe ? "user" : "tutor",
          text: msg.content,
          time: timeStr,
          read: isRead,
        };
      });

      setMessages(formattedMessages);
    };

    void fetchAndMarkRead();

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
          const newMsg = payload.new as SupabaseMessageRecord;
          const isSenderMe = newMsg.sender_id === currentUser.id;
          const msgTime = new Date(newMsg.created_at);
          const timeStr = `${msgTime.getHours().toString().padStart(2, "0")}:${msgTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          setMessages((prev) => [
            ...prev,
            {
              id: newMsg.id,
              sender: isSenderMe ? "user" : "tutor",
              text: newMsg.content,
              time: timeStr,
              read: isSenderMe ? true : false,
            },
          ]);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeChatId, currentUser, supabase]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId || !currentUser) return;

    const textToSend = inputMessage;
    setInputMessage("");

    // DB에 메시지 삽입 (Realtime 구독을 통해 자동으로 목록에 추가되며 스크롤됨)
    await supabase.from("messages").insert({
      room_id: activeChatId,
      sender_id: currentUser.id,
      content: textToSend,
    });
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      <nav className="h-16 shrink-0 bg-[#0e2640] border-b border-[#0e2640] shadow-sm z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
          <div className="flex justify-between items-center h-full">
            <button
              onClick={() => router.push("/")}
              className="shrink-0 flex items-center cursor-pointer gap-1"
            >
              <span className="font-extrabold text-2xl tracking-tighter text-[#F5EBBC]">
                IEUM<span className="text-[#F5EBBC] ml-0.5 text-3xl">.</span>
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push("/students/timetable")}
                className="text-base font-bold text-[#F5EBBC]/80 hover:text-[#F5EBBC] transition-colors cursor-pointer"
              >
                スケジュール
              </button>
              <button
                onClick={() => router.push("/students/matching")}
                className="text-base font-bold text-[#F5EBBC]/80 hover:text-[#F5EBBC] transition-colors cursor-pointer"
              >
                授業
              </button>
              <button
                onClick={() => router.push("/chats")}
                className="text-base font-bold text-[#F5EBBC] transition-colors cursor-pointer border-b-2 border-[#F5EBBC] pb-0.5"
              >
                チャット
              </button>
              <button
                onClick={() => router.push("/students")}
                className="text-base font-bold text-[#F5EBBC]/80 hover:text-[#F5EBBC] transition-colors cursor-pointer"
              >
                メニュー
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto px-6 lg:px-12 pt-5 pb-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 w-full bg-white rounded-t-2xl rounded-b-none border border-b-0 border-slate-200 shadow-sm flex overflow-hidden">
          <div className="w-[21.4%] shrink-0 h-full flex flex-col border-r border-slate-100 bg-white min-h-0">
            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              unreadOnly={unreadOnly}
              searchQuery={searchQuery}
              setUnreadOnly={setUnreadOnly}
              setSearchQuery={setSearchQuery}
              onSelectChat={(id) => {
                setActiveChatId(id);
                if (!id) setMessages([]); // 👈 선택 해제 시 안전하게 초기화
              }}
              unifiedImageUrl={UNIFIED_IMAGE_URL}
              userRole={currentUser?.role}
            />
          </div>

          <div className="w-[57.2%] shrink-0 h-full flex flex-col border-r border-slate-100 bg-white relative min-h-0">
            {activeChat ? (
              <ChatRoom
                activeChat={activeChat}
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                onSendMessage={handleSendMessage}
                unifiedImageUrl={UNIFIED_IMAGE_URL}
                roomId={activeChat.id}
                userRole={currentUser?.role}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                チャットルームを選択してください
              </div>
            )}
          </div>

          <div className="w-[21.4%] shrink-0 h-full flex flex-col bg-white min-h-0">
            <ChatInfo
              activeChat={activeChat}
              unifiedImageUrl={UNIFIED_IMAGE_URL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
