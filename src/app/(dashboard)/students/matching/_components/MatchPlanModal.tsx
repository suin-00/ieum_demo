"use client";

import React from "react";
import PlanCard from "./PlanCard";
import { Tutor } from "./MatchingForm";
import { X } from "lucide-react";

interface MatchPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor | null;
  onConfirmPlan: (sessions: number) => void;
}

export function MatchPlanModal({
  isOpen,
  onClose,
  tutor,
  onConfirmPlan,
}: MatchPlanModalProps) {
  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* 모달 박스: 불필요한 스크롤을 없애고 카드가 깔끔하게 들어가도록 조정 */}
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl flex flex-col relative">
        {/* 상단 헤더: 튜터 이름 및 깔끔한 뒤로가기(닫기) 버튼 */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {tutor.nickname}さんに合ったプランを選択
          </h3>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 플랜 카드 영역 (카드 내부의 onSelectPlan을 통해 4회 또는 8회 전달) */}
        <div className="w-full flex justify-center items-center py-2">
          <PlanCard
            isModal={true}
            onSelectPlan={(sessions) => onConfirmPlan(sessions)}
          />
        </div>
      </div>
    </div>
  );
}
