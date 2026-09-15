"use client";

import React from "react";
import { Check, RotateCcw } from "lucide-react";
import { Tutor } from "./MatchingForm";
import Image from "next/image";

interface TutorListProps {
  tutors: Tutor[];
  onResetCarousel: () => void;
  onOpenDetail: (tutor: Tutor) => void;
  onStartChat: (tutor: Tutor) => void;
}

export function TutorList({
  tutors,
  onResetCarousel,
  onOpenDetail,
  onStartChat,
}: TutorListProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
        <h2 className="text-xl font-black text-[#0e2640] tracking-tight mt-0.5">
          すべてのおすすめチューター一覧
        </h2>
        <button
          onClick={onResetCarousel}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0e2640] bg-[#f0ddbd]/30 border border-[#f0ddbd]/60 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>もう一度見る</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-3xl border border-[#61799C]/20 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#61799C]/30 shrink-0 bg-slate-100">
                  <Image
                    src={tutor.imageUrl}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0e2640] text-base">
                    {tutor.name}{" "}
                    {tutor.age && (
                      <span className="text-xs text-slate-500 font-medium">
                        {tutor.age}歳
                      </span>
                    )}
                  </h3>
                  <p className="text-xs font-semibold text-[#61799C] mt-0.5">
                    {tutor.university} · {tutor.major}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-[#61799C]/10">
              <button
                onClick={() => onOpenDetail(tutor)}
                className="flex-1 py-2 px-3 text-xs font-bold text-[#0e2640] bg-[#f0ddbd]/40 rounded-xl cursor-pointer text-center"
              >
                詳細を見る
              </button>
              <button
                onClick={() => onStartChat(tutor)}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#0e2640] rounded-xl cursor-pointer flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>マッチング相談</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
