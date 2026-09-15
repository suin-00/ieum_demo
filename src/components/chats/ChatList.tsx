// src/components/chats/ChatList.tsx
import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface ChatItem {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

interface ChatListViewProps {
  chats: ChatItem[];
  activeChatId: string | null;
  unreadOnly: boolean;
  searchQuery: string;
  setUnreadOnly: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  onSelectChat: (chatId: string) => void;
  unifiedImageUrl?: string;
  userRole?: "student" | "tutor" | string; // 💡 유저 역할 추가
}

export default function ChatListView({
  chats,
  activeChatId,
  unreadOnly,
  searchQuery,
  setUnreadOnly,
  setSearchQuery,
  onSelectChat,
  userRole,
}: ChatListViewProps) {
  // 💡 튜터(한국인)는 한국어, 튜티(일본인)는 일본어 적용
  const isTutor = userRole === "tutor";

  const titleText = isTutor ? "채팅" : "メッセージ";
  const searchPlaceholder = isTutor ? "검색..." : "検索...";
  const allText = isTutor ? "전체" : "すべて";
  const unreadOnlyText = isTutor ? "안 읽은 메시지" : "未読のみ";
  const emptyMessage = isTutor
    ? "참여 중인 대화방이 없습니다."
    : "チャットルームがありません";

  const filteredChats = chats.filter((chat) => {
    if (unreadOnly && !chat.unread) return false;
    if (searchQuery.trim()) {
      return (
        chat.name.includes(searchQuery.trim()) ||
        chat.lastMessage.includes(searchQuery.trim())
      );
    }
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col bg-white min-h-0 overflow-x-hidden">
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-slate-100 shrink-0">
        <h2 className="text-base font-bold text-[#0E2640]">{titleText}</h2>
      </div>

      <div className="px-3 py-2.5 border-b border-slate-50 shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="block w-full pl-8 pr-3 py-1.5 bg-slate-50 border-none rounded-md text-xs placeholder-slate-400 focus:ring-1 focus:ring-slate-200 focus:bg-white outline-none"
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => setUnreadOnly(false)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded ${
              !unreadOnly
                ? "bg-[#0E2640] text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {allText}
          </button>
          <button
            onClick={() => setUnreadOnly(true)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded ${
              unreadOnly
                ? "bg-[#0E2640] text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {unreadOnlyText}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-50 min-h-0">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            {emptyMessage}
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${
                activeChatId === chat.id
                  ? "bg-slate-50 border-l-2 border-[#0E2640]"
                  : "hover:bg-slate-50/50"
              }`}
            >
              <Image
                src={chat.avatar}
                alt={chat.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover border border-slate-100 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-xs font-bold text-[#0E2640] truncate">
                    {chat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {chat.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
