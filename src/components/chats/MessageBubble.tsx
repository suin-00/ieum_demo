import React from "react";

interface MessageBubbleProps {
  sender: "user" | "tutor";
  text: string;
  time: string;
}

export default function MessageBubble({
  sender,
  text,
  time,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  // 1. [파일] 형식인지 확인하고 파일 이름과 URL 분리하기
  const isFileMessage = text.startsWith("[파일]");
  let fileName = "";
  let fileUrl = "";

  if (isFileMessage) {
    const cleanText = text.replace("[파일] ", "");
    const parts = cleanText.split(":::");
    fileName = parts[0];
    fileUrl = parts[1];
  }

  // 2. 이미지 확장자 파일인지 판별
  const isImageFile =
    isFileMessage && /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

  return (
    <div
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-2`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          isUser
            ? "bg-[#1e314a] text-white rounded-br-none"
            : "bg-[#d8e8f2] text-[#0E2640] rounded-bl-none"
        }`}
      >
        {isFileMessage ? (
          <div className="space-y-1.5">
            {isImageFile ? (
              // 이미지 파일인 경우 채팅창 내에 미리보기 렌더링
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg"
              >
                <img
                  src={fileUrl}
                  alt={fileName}
                  className="max-w-full h-auto max-h-48 object-cover rounded-lg hover:opacity-95 transition"
                />
              </a>
            ) : (
              // 일반 파일인 경우 다운로드 링크 형태로 렌더링
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 underline text-xs break-all ${
                  isUser ? "text-white" : "text-blue-600"
                }`}
              >
                📎 {fileName}
              </a>
            )}
          </div>
        ) : (
          // 일반 텍스트 메시지
          <p className="whitespace-pre-wrap break-words">{text}</p>
        )}
      </div>
      <span className="text-[9px] text-slate-400 mt-1 px-1">{time}</span>
    </div>
  );
}
