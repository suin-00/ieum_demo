// src/components/chats/ChatRoom.tsx
import React from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
  Check,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import Image from "next/image";

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

interface ChatRoomProps {
  activeChat: ChatItem;
  messages: MessageItem[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  unifiedImageUrl: string;
}

export default function ChatRoom({
  activeChat,
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  unifiedImageUrl,
}: ChatRoomProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white relative min-h-0">
      {/* Header */}
      <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={unifiedImageUrl}
              alt={activeChat.name}
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
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors"
            title="音声通話"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors"
            title="ビデオ通話"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors"
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
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#485B76] text-white rounded-br-none shadow-xs"
                    : "bg-slate-100 text-[#0E2640] rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.images && (
                  <div className="flex gap-2 mt-2.5">
                    {msg.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt="添付ファイル"
                        className="w-24 h-20 object-cover rounded-lg border border-black/5 hover:opacity-90 transition-opacity cursor-pointer"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 px-1">
                <span className="text-[11px] text-slate-400 font-medium">
                  {msg.time}
                </span>
                {isUser && (
                  <Check
                    className={`w-3.5 h-3.5 stroke-[2.5] ${msg.read ? "text-[#F0DDBD]" : "text-[#0E2640]"}`}
                  />
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
            className="flex-1 bg-transparent border-none text-sm text-[#0E2640] placeholder-slate-400 focus:ring-0 outline-none px-2"
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
