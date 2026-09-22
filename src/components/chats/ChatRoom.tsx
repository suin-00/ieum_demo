// src/components/chats/ChatRoom.tsx
import React, { useEffect } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
  Check,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

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
  createdAt?: string;
}

interface ChatRoomProps {
  activeChat: ChatItem;
  messages: MessageItem[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  unifiedImageUrl: string;
  roomId: string;
  userRole?: "student" | "tutor" | string;
}

export default function ChatRoom({
  activeChat,
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  unifiedImageUrl,
  roomId,
  userRole,
}: ChatRoomProps) {
  const supabase = createClient();

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

  return (
    <div className="w-full h-full flex flex-col bg-white relative min-h-0">
      {/* Header */}
      <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={unifiedImageUrl}
              alt={activeChat.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover border border-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0E2640]">
              {activeChat.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {activeChat.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title="音声通話"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title="ビデオ通話"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title="メニュー"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white min-h-0">
        <div className="flex justify-center">
          <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-3.5 py-1 rounded-full">
            2026年5月16日 (月)
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col w-full ${
                isUser ? "items-end" : "items-start"
              }`}
            >
              {/* 말풍선 영역 */}
              <div
                className={`flex items-end max-w-[75%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#485B76] text-white rounded-br-none shadow-xs"
                      : "bg-slate-100 text-[#0E2640] rounded-bl-none"
                  }`}
                  style={{
                    display: "inline-block",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  <p className="whitespace-pre-wrap m-0">{msg.text}</p>
                  {msg.images && (
                    <div className="flex gap-2 mt-2.5">
                      {msg.images.map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          alt="添付ファイル"
                          width={96}
                          height={80}
                          className="w-24 h-20 object-cover rounded-lg border border-black/5 hover:opacity-90 transition-opacity cursor-pointer"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 💡 하단 정보 영역: [시간] [체크아이콘] [주황색 '1'] 순서로 배치 (isUser일 때 역순 정렬) */}
              <div
                className={`flex items-center gap-1.5 mt-1.5 px-1 ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span className="text-[11px] text-slate-400 font-medium">
                  {msg.time}
                </span>

                {isUser && (
                  <>
                    <Check
                      className={`w-3.5 h-3.5 stroke-[2.5] ${
                        msg.read ? "text-[#F0DDBD]" : "text-[#0E2640]"
                      }`}
                    />
                    {!msg.read && (
                      <span className="text-[10px] font-bold text-amber-500 select-none shrink-0">
                        1
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form
          onSubmit={onSendMessage}
          className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/70 focus-within:border-[#0E2640]/50 focus-within:bg-white transition-all"
        >
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-[#0E2640] transition-colors shrink-0 cursor-pointer"
            title="ファイルを添付"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 bg-transparent border-none text-sm text-[#0E2640] placeholder-slate-400 focus:ring-0 outline-none px-2 min-w-0"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`p-2.5 rounded-xl shrink-0 transition-all cursor-pointer ${
              inputMessage.trim()
                ? "bg-[#0E2640] text-white shadow-xs hover:bg-[#0a1c2f]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            title="送信"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
