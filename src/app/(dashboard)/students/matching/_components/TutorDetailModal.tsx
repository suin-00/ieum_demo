"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { Tutor } from "./MatchingForm"; // Tutor 타입 경로에 맞게 수정해주세요
import { getSafeImageUrl } from "@/lib/utils";

interface TutorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor;
  onStartChat: (tutor: Tutor) => void;
}

export function TutorDetailModal({
  isOpen,
  onClose,
  tutor,
  onStartChat,
}: TutorDetailModalProps) {
  const safeImageUrl = getSafeImageUrl(tutor?.imageUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  チューター詳細情報
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="閉じる"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3.5 mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 select-none">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 shadow-sm relative">
                  <Image
                    src={safeImageUrl}
                    alt={tutor.name}
                    fill
                    loading="eager"
                    sizes="56px"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {tutor.name}
                    </h4>
                    {tutor.age && (
                      <span className="text-xs text-slate-500 font-medium">
                        {tutor.age}歳
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {tutor.university} · {tutor.major}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pb-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    自己紹介
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                    {tutor.bio}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    専門分野 & 技術スタック
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {tutor.matchReasons && tutor.matchReasons.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      おすすめポイント
                    </h4>
                    <ul className="space-y-2">
                      {tutor.matchReasons.map((reason) => (
                        <li
                          key={reason}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-600 stroke-3" />
                          </div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-2 mt-auto">
                <button
                  onClick={() => {
                    onClose();
                    onStartChat(tutor);
                  }}
                  className="w-full py-3 bg-[#007AFF] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0066CC] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-3" />
                  <span>{tutor.name} チューターと相談開始</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
