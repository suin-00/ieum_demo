"use client";

import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import ChatList from "@/components/chats/ChatList";
import ChatWindow from "@/components/chats/ChatWindow";
import ChatInfo from "@/components/chats/ChatInfo";

export default function ChatPage() {
  const {
    currentUser,
    chats,
    messages,
    activeChatId,
    setActiveChatId,
    sendMessage,
    sendFileMessage, // 👈 1. 훅에서 파일 전송 함수 가져오기
  } = useChat();

  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat" | "info">(
    "list",
  );

  // 현재 선택된 채팅방 객체 찾기
  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // 메시지 전송 핸들러
  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    void sendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="h-dvh w-full bg-slate-50 flex flex-col overflow-hidden font-sans sm:h-[700px] sm:w-[420px] sm:fixed sm:bottom-4 sm:right-4 sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-200 lg:h-screen lg:w-full lg:max-w-none lg:static lg:bottom-auto lg:right-auto lg:rounded-none lg:shadow-none lg:border-none lg:bg-slate-50">
      <div className="flex-1 min-h-0 w-full lg:max-w-[1600px] lg:mx-auto lg:px-12 lg:pt-5 lg:pb-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 w-full bg-white lg:rounded-t-2xl lg:border lg:border-b-0 lg:border-slate-200 lg:shadow-sm flex overflow-hidden relative">
          {/* A. 채팅 목록 패널 */}
          <div
            className={`w-full lg:w-[21.4%] shrink-0 h-full flex-col border-r border-slate-100 bg-white min-h-0 overflow-x-hidden ${mobileView === "list" ? "flex" : "hidden lg:flex"}`}
          >
            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              unreadOnly={unreadOnly}
              searchQuery={searchQuery}
              setUnreadOnly={setUnreadOnly}
              setSearchQuery={setSearchQuery}
              onSelectChat={(chatId) => {
                setActiveChatId(chatId);
                setMobileView("chat");
              }}
              userRole={currentUser?.role}
            />
          </div>

          {/* B. 대화창 패널 */}
          <div
            className={`w-full lg:w-[57.2%] shrink-0 h-full flex-col border-r border-slate-100 bg-white relative min-h-0 overflow-x-hidden ${mobileView === "chat" ? "flex" : "hidden lg:flex"}`}
          >
            <ChatWindow
              activeChat={activeChat}
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onBack={() => setMobileView("list")}
              onOpenInfo={() => setMobileView("info")}
              onSendMessage={handleSendMessageSubmit}
              userRole={currentUser?.role}
              onFileSelect={(file) => void sendFileMessage(file)} // 👈 2. 파일 선택 시 업로드 및 전송 연동 완료!
            />
          </div>

          {/* C. 상세 정보 패널 */}
          <div
            className={`w-full lg:w-[21.4%] shrink-0 h-full flex-col bg-white min-h-0 overflow-x-hidden ${mobileView === "info" ? "flex" : "hidden lg:flex"}`}
          >
            <ChatInfo
              activeChat={activeChat}
              onBack={() => setMobileView("chat")}
              userRole={currentUser?.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
