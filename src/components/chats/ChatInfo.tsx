// src/components/chats/ChatInfo.tsx
import React from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { getSafeImageUrl } from "@/lib/utils"; // 👈 유틸 함수가 있는 경로에 맞게 확인

interface ChatItem {
  name: string;
  role: string;
  avatar: string;
}

interface ChatInfoProps {
  activeChat: ChatItem | null;
  unifiedImageUrl?: string;
  onBack?: () => void;
  userRole?: "student" | "tutor" | string; // 💡 유저 역할 추가
}

export default function ChatInfoView({
  activeChat,
  onBack,
  userRole,
}: ChatInfoProps) {
  // 💡 튜터는 한국어, 튜티는 일본어
  const isTutor = userRole === "tutor";
  const infoTitle = isTutor ? "상세 정보" : "詳細情報";

  return (
    <div className="w-full h-full flex flex-col bg-white min-h-0 overflow-x-hidden">
      <div className="px-3 py-3 flex items-center gap-2 border-b border-slate-100 bg-white shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-500 hover:bg-slate-50 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-xs text-[#0E2640]">{infoTitle}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeChat && (
          <div className="flex flex-col items-center text-center">
            <Image
              src={getSafeImageUrl(
                activeChat.avatar || "/images/unified_profile.png",
              )}
              alt={activeChat.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover mb-2 border border-slate-100 shrink-0"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-sm font-bold text-[#0E2640]">
              {activeChat.name}
            </h3>
            <p className="text-[10px] text-slate-500">{activeChat.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}
