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

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          isUser
            ? "bg-[#1e314a] text-white rounded-br-none"
            : "bg-[#d8e8f2] text-[#0E2640] rounded-bl-none"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
      <span className="text-[9px] text-slate-400 mt-1 px-1">{time}</span>
    </div>
  );
}
