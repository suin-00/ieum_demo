// src/components/chats/ChatContainer.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatInfo from "./ChatInfo";

const UNIFIED_IMAGE_URL = "images/unified_profile.png"; // 통합 이미지 URL

// 1. 타입 인터페이스 정의
interface ChatItem {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

interface MessageItem {
  id: string;
  sender: "user" | "tutor";
  text: string;
  time: string;
  read: boolean;
  images?: string[];
}

export default function ChatContainer() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  // 목 데이터 제거 및 빈 배열 상태 + 타입 지정
  const [chats] = useState<ChatItem[]>([]);
  const [messages] = useState<MessageItem[]>([]);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // 메시지 전송 핸들러 (추후 Supabase 연동 자리)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setInputMessage("");
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      {/* Top Navigation Bar */}
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

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#F5EBBC] hover:text-white cursor-pointer"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#0A1D31] border-t border-[#122E4D] px-4 py-4 space-y-3 absolute top-16 left-0 right-0 z-50 shadow-lg">
            <button
              onClick={() => {
                router.push("/students/timetable");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-bold text-[#F5EBBC]/90 py-1.5 cursor-pointer"
            >
              スケジュール
            </button>
            <button
              onClick={() => {
                router.push("/students/matching");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-bold text-[#F5EBBC]/90 py-1.5 cursor-pointer"
            >
              授業
            </button>
            <button
              onClick={() => {
                router.push("/chats");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-bold text-[#F5EBBC] py-1.5 cursor-pointer"
            >
              チャット
            </button>
            <button
              onClick={() => {
                router.push("/students");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-base font-bold text-[#F5EBBC]/90 py-1.5 cursor-pointer"
            >
              メニュー
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto px-6 lg:px-12 pt-5 pb-0 flex flex-col overflow-hidden">
        {/* 3-Column Layout Container */}
        <div className="flex-1 min-h-0 w-full bg-white rounded-t-2xl rounded-b-none border border-b-0 border-slate-200 shadow-sm flex overflow-hidden">
          {/* A. Left Column: Chat List */}
          <div className="w-[21.4%] shrink-0 h-full flex flex-col border-r border-slate-100 bg-white min-h-0">
            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              unreadOnly={unreadOnly}
              searchQuery={searchQuery}
              setUnreadOnly={setUnreadOnly}
              setSearchQuery={setSearchQuery}
              onSelectChat={(id) => setActiveChatId(id)}
              unifiedImageUrl={UNIFIED_IMAGE_URL}
            />
          </div>

          {/* B. Center Column: Chat Room */}
          <div className="w-[57.2%] shrink-0 h-full flex flex-col border-r border-slate-100 bg-white relative min-h-0">
            {activeChat ? (
              <ChatRoom
                activeChat={activeChat}
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                onSendMessage={handleSendMessage}
                unifiedImageUrl={UNIFIED_IMAGE_URL}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                チャットルームを選択してください
              </div>
            )}
          </div>

          {/* C. Right Column: Chat Info */}
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
