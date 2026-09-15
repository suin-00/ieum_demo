"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { Tutor } from "./MatchingForm";
import Image from "next/image";

interface TutorDetailModalProps {
  isOpen: boolean;
  tutor: Tutor | null;
  onClose: () => void;
  onStartChat: (tutor: Tutor) => void;
}

export function TutorDetailModal({
  isOpen,
  tutor,
  onClose,
  onStartChat,
}: TutorDetailModalProps) {
  if (!isOpen || !tutor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-extrabold text-[#0e2640] tracking-tight">
                チューター詳細情報
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-100 rounded-full text-[#61799C] hover:bg-slate-200 transition-colors cursor-pointer"
                title="閉じる"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 mb-4 p-3.5 bg-slate-50 rounded-2xl border border-[#61799C]/10 select-none">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#61799C]/30 shadow-sm">
                <Image
                  src={tutor.imageUrl}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                  width={56}
                  height={56}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-[#0e2640] text-base">
                    {tutor.name}
                  </h4>
                  {tutor.age && (
                    <span className="text-xs text-slate-500 font-medium">
                      {tutor.age}歳
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#61799C] mt-0.5">
                  {tutor.university} · {tutor.major}
                </p>
              </div>
            </div>

            <div className="space-y-4 pb-4">
              <div>
                <h4 className="text-xs font-bold text-[#61799C] uppercase tracking-wider mb-1.5">
                  自己紹介
                </h4>
                <p className="text-[#465265] text-xs leading-relaxed whitespace-pre-wrap">
                  {tutor.bio || "紹介文がありません。"}
                </p>
              </div>
              {tutor.tags && tutor.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#61799C] uppercase tracking-wider mb-1.5">
                    専門分野・技術スタック
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#f0ddbd]/40 text-[#0e2640] px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#f0ddbd]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 mt-auto border-t border-[#61799C]/10">
              <button
                onClick={() => {
                  onClose();
                  onStartChat(tutor);
                }}
                className="w-full py-3 bg-[#0e2640] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0e2640]/95 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <Check className="w-4 h-4 stroke-3" />
                <span>{tutor.name} チューターと相談を開始</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
