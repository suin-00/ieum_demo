// src/components/chats/ChatWindowView.tsx
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import { getSafeImageUrl } from "@/lib/utils";
import MessageBubble from "./MessageBubble";
import { createClient } from "@/lib/supabase/client"; // 💡 Supabase 클라이언트 임포트 추가

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
  userRole?: "student" | "tutor" | string;
  onFileSelect?: (file: File) => void;
  roomId?: string; // 💡 roomId props 추가
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
  onFileSelect,
  roomId, // 💡 roomId 받기
}: ChatWindowViewProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 💡 채팅방에 진입했을 때 자동으로 내 last_read_at을 현재 시간으로 갱신
  useEffect(() => {
    const markRoomAsRead = async () => {
      if (!roomId) return;

      const isStudent = userRole === "student";
      const columnName = isStudent
        ? "student_last_read_at"
        : "tutor_last_read_at";

      try {
        await supabase
          .from("chat_rooms")
          .update({ [columnName]: new Date().toISOString() })
          .eq("id", roomId);
      } catch (err) {
        console.error("채팅방 읽음 처리 에러:", err);
      }
    };

    void markRoomAsRead();
  }, [roomId, userRole, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isTutor = userRole === "tutor";
  const placeholderText = isTutor
    ? "메시지를 입력하세요..."
    : "メッセージを入力してください...";

  const emptyMessageText = isTutor
    ? "메시지 내역이 없습니다."
    : "メッセージ履歴はありません";

  const handleClipClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-white relative min-h-0 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-3 flex items-center justify-between border-b border-slate-100 bg-white z-10 shrink-0 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {activeChat && (
            <>
              <Image
                src={getSafeImageUrl(activeChat.avatar)}
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
          className="p-1.5 text-slate-400 hover:text-[#0E2640] cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 w-full overflow-y-auto p-4 space-y-3 bg-white min-h-0">
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
              read={msg.read}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2.5 bg-white border-t border-slate-100 shrink-0 w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        <form
          onSubmit={onSendMessage}
          className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full"
        >
          <button
            type="button"
            onClick={handleClipClick}
            className="p-1 text-slate-400 hover:text-[#0E2640] cursor-pointer"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 bg-transparent border-none text-xs text-[#0E2640] placeholder-slate-400 outline-none px-1 min-w-0"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`p-1.5 rounded-lg text-white cursor-pointer shrink-0 ${
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
