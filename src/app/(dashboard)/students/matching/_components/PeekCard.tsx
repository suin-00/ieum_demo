"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Tutor } from "./MatchingForm";

interface PeekCardProps {
  tutor: Tutor;
  type: "prev" | "next";
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
  delay: 0,
};

const carouselVariants = {
  active: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 10,
    transition: springTransition,
  },
  next: {
    x: "75%",
    y: 12,
    rotate: 3,
    scale: 0.9,
    opacity: 0.6,
    filter: "blur(4px)",
    zIndex: 0,
    transition: springTransition,
  },
  prev: {
    x: "-75%",
    y: 12,
    rotate: -3,
    scale: 0.9,
    opacity: 0.6,
    filter: "blur(4px)",
    zIndex: 0,
    transition: springTransition,
  },
};

const getSafeImageUrl = (url?: string) => {
  if (
    !url ||
    typeof url !== "string" ||
    url.trim() === "" ||
    url === "undefined" ||
    url === "null"
  ) {
    return "/images/unified_profile.png";
  }
  if (url.startsWith("images/")) {
    return `/${url}`;
  }
  return url;
};

export const PeekCard = React.forwardRef<HTMLDivElement, PeekCardProps>(
  ({ tutor, type }, ref) => {
    const isNext = type === "next";
    const label = isNext ? "次のチューター" : "前のチューター";
    const positionClass = isNext ? "right-3.5" : "left-3.5";
    const safeImageUrl = getSafeImageUrl(tutor.imageUrl);

    return (
      <motion.div
        ref={ref}
        key={`${type}-peek-${tutor.id}`}
        variants={carouselVariants}
        initial={type}
        animate={type}
        exit={type}
        className="flex flex-col absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/20 select-none pointer-events-none"
        style={{ transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900 pointer-events-none">
          <Image
            src={getSafeImageUrl(tutor.backgroundUrl)}
            alt={tutor.nickname} // 👈 name 대신 nickname 사용
            fill
            sizes="340px"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: `linear-gradient(135deg, ${tutor.themeColor || "#3B82F6"} 0%, #1E293B 100%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 30%, transparent 60%)",
          }}
        />

        <div
          className={`absolute top-3.5 ${positionClass} bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20 z-10`}
        >
          {!isNext && <ChevronLeft className="w-3 h-3" />}
          <span>{label}</span>
          {isNext && <ChevronRight className="w-3 h-3" />}
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/80 shadow-xs shrink-0 bg-slate-800 relative">
              <Image
                src={safeImageUrl}
                alt={tutor.nickname} // 👈 name 대신 nickname 사용
                fill
                sizes="36px"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* 👈 닉네임 메인 + 옆에 회색 후리가나 표시 */}
                <span className="text-base font-extrabold truncate flex items-baseline gap-1.5">
                  <span>{tutor.nickname}</span>
                  {tutor.furigana && (
                    <span className="text-xs font-normal text-white/60">
                      {tutor.furigana}
                    </span>
                  )}
                </span>
                {tutor.age && (
                  <span className="text-xs opacity-90">{tutor.age}歳</span>
                )}
              </div>
              <p className="text-[11px] text-white/80 mt-0.5 font-medium truncate">
                {tutor.university} · {tutor.major}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

PeekCard.displayName = "PeekCard";
