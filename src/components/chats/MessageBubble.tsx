// src/components/chats/MessageBubble.tsx
import React from "react";
import Image from "next/image";

interface MessageBubbleProps {
  sender: "user" | "tutor";
  text: string;
  time: string;
  read: boolean;
  images?: string[];
}

export default function MessageBubble({
  sender,
  text,
  time,
  read,
  images,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  // 파일 메시지 형태("[파일] 이름:::URL") 파싱 처리
  const displayContent = text;
  let fileUrl = "";
  let fileName = "";

  if (text.startsWith("[파일]")) {
    const parts = text.replace("[파일] ", "").split(":::");
    fileName = parts[0];
    fileUrl = parts[1];
  }

  return (
    <div
      className={`flex flex-col w-full ${isUser ? "items-end" : "items-start"}`}
    >
      {/* 1. 말풍선 본체 */}
      <div
        className={`flex items-end max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser ? "rounded-br-none shadow-xs" : "rounded-bl-none"
          }`}
          style={{
            display: "inline-block",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            // 💡 내가 보내는 말풍선(#1e314a), 상대가 보내는 말풍선(#d8e8f2) 색상 및 텍스트 색상 적용
            backgroundColor: isUser ? "#1e314a" : "#d8e8f2",
            color: isUser ? "#ffffff" : "#0E2640",
          }}
        >
          {fileUrl ? (
            <div className="space-y-2">
              <p className="whitespace-pre-wrap m-0 text-xs font-semibold underline truncate max-w-[200px]">
                {fileName}
              </p>
              {fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                <Image
                  src={fileUrl}
                  alt={fileName}
                  width={120}
                  height={100}
                  className="w-28 h-24 object-cover rounded-lg border border-black/5 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>
          ) : (
            <p className="whitespace-pre-wrap m-0">{text}</p>
          )}

          {images && images.length > 0 && (
            <div className="flex gap-2 mt-2.5">
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="첨부 이미지"
                  width={96}
                  height={80}
                  className="w-24 h-20 object-cover rounded-lg border border-black/5"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. 하단 정보 영역: [시간] [아이보리색 '1'] */}
      <div
        className={`flex items-center gap-1.5 mt-1.5 px-1 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <span className="text-[11px] text-slate-400 font-medium">{time}</span>

        {isUser && !read && (
          <span
            className="text-[10px] font-bold select-none shrink-0"
            style={{ color: "#f0ddbd" }}
          >
            1
          </span>
        )}
      </div>
    </div>
  );
}
