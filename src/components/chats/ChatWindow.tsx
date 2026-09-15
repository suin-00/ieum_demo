// src/components/chats/ChatWindow.tsx
import React from "react";
import Image from "next/image";
import { ChevronLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";

interface ChatItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface MessageItem {
  id: string;
  sender: "user" | "tutor";
  text: string;
  time: string;
  read: boolean;
}

interface ChatWindowViewProps {
  activeChat: ChatItem | null;
  messages: MessageItem[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onBack: () => void;
  onOpenInfo: () => void;
  onSendMessage: (e: React.FormEvent) => void;
  userRole?: "student" | "tutor" | string; // 💡 로그인한 유저의 역할 추가
}

export default function ChatWindowView({
  activeChat,
  messages,
  inputMessage,
  setInputMessage,
  onBack,
  onOpenInfo,
  onSendMessage,
  userRole,
}: ChatWindowViewProps) {
  // 💡 유저 역할에 따른 텍스트 분기 (튜터: 한국어 / 튜티: 일본어)
  const isTutor = userRole === "tutor";
  const placeholderText = isTutor
    ? "메시지를 입력하세요..."
    : "メッセージを入力してください...";

  const emptyMessageText = isTutor
    ? "메시지 내역이 없습니다."
    : "メッセージ履歴はありません";

  return (
    <div className="w-full h-full flex flex-col bg-white relative min-h-0 overflow-x-hidden">
      {/* Header */}
      <div className="px-3 py-3 flex items-center justify-between border-b border-slate-100 bg-white z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-500 hover:bg-slate-50 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {activeChat && (
            <>
              <Image
                src={activeChat.avatar}
                alt={activeChat.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-slate-100 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-xs font-bold text-[#0E2640] truncate">
                  {activeChat.name}
                </h2>
                <p className="text-[9px] text-slate-500 truncate">
                  {activeChat.role}
                </p>
              </div>
            </>
          )}
        </div>
        <button
          onClick={onOpenInfo}
          className="p-1.5 text-slate-400 hover:text-[#0E2640]"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white min-h-0">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            {emptyMessageText}
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              sender={msg.sender}
              text={msg.text}
              time={msg.time}
            />
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-2.5 bg-white border-t border-slate-100 shrink-0">
        <form
          onSubmit={onSendMessage}
          className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200"
        >
          <button
            type="button"
            className="p-1 text-slate-400 hover:text-[#0E2640]"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={placeholderText} // 💡 동적 플레이스홀더 적용
            className="flex-1 bg-transparent border-none text-xs text-[#0E2640] placeholder-slate-400 outline-none px-1"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`p-1.5 rounded-lg text-white ${
              inputMessage.trim()
                ? "bg-[#0E2640]"
                : "bg-slate-200 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
