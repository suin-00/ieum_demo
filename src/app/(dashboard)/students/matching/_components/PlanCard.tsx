"use client";

import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export interface PlanCardProps {
  onSelectPlan?: (sessions: number) => void;
  isModal?: boolean; // 👈 모달 내부에서 호출될 때 true로 전달
}

export default function PlanCard({
  onSelectPlan,
  isModal = false,
}: PlanCardProps) {
  return (
    <div
      className={`w-full font-sans overflow-x-clip ${
        isModal
          ? "bg-transparent p-0" // 👈 모달 안에서는 배경색과 패딩을 없애고 투명하게 처리
          : "min-h-[calc(100vh-5rem)] bg-[#F9FAFB] flex flex-col justify-center items-center px-4"
      }`}
    >
      <main
        className={`w-full max-w-4xl flex flex-col items-center ${isModal ? "py-0" : "py-6"}`}
      >
        {/* Header Section: 모달이 아닐 때만 표시 */}
        {!isModal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-4xl mb-4 text-left"
          >
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0e2640] tracking-tight">
              あなたに合ったプランを
            </h1>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Card 1: Standard Plan (월 4회) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            onClick={() => onSelectPlan?.(4)}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#0e2640] transition-all"
          >
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-[#0e2640] mb-1">
                  スタンダードプラン
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm">
                  無理なく、会話を習慣に。
                </p>
              </div>

              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-extrabold text-[#0e2640] tracking-tight">
                  ¥7,600
                </span>

                <span className="text-slate-500 ml-2 text-sm font-medium">
                  / 月4回
                </span>
              </div>

              {/* Price Per Session Callout */}
              <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  1回あたりの料金
                </span>

                <span className="text-base font-bold text-[#0e2640]">
                  ¥1,900
                </span>
              </div>

              <ul className="space-y-2 mb-5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    1回あたり{" "}
                    <strong className="font-semibold text-[#0e2640]">
                      1時間
                    </strong>{" "}
                    のセッション
                  </span>
                </li>

                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    週1回、日常会話や韓国の大学生活・文化がテーマ
                  </span>
                </li>

                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    少しずつ韓国語で話すことに慣れていく
                  </span>
                </li>
              </ul>
            </div>

            {/* 카드 하단 디자인용 가짜 버튼 (클릭 시 선택됨) */}
            <div className="w-full py-2.5 px-6 rounded-full bg-slate-100 text-[#0e2640] font-semibold text-sm text-center">
              選択する
            </div>
          </motion.div>

          {/* Card 2: Intensive Plan (월 8회) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
            onClick={() => onSelectPlan?.(8)}
            className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#0e2640] shadow-[0_8px_30px_rgba(14,38,64,0.12)] flex flex-col justify-between relative mt-3 md:mt-0 cursor-pointer hover:scale-[1.01] transition-all"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#0e2640] text-[#F5EBBC] text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                人気・おすすめ
              </span>
            </div>

            <div>
              <div className="mb-4 mt-1">
                <h2 className="text-lg font-bold text-[#0e2640] mb-1">
                  集中プラン
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm">
                  もっと話して、もっと自然な韓国語へ。
                </p>
              </div>

              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-extrabold text-[#0e2640] tracking-tight">
                  ¥13,600
                </span>

                <span className="text-slate-500 ml-2 text-sm font-medium">
                  / 月8回
                </span>
              </div>

              {/* Price Per Session Callout */}
              <div className="bg-[#0e2640]/5 rounded-2xl p-3 mb-4 border border-[#0e2640]/20 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-[#0e2640]">
                  1回あたりの料金
                </span>

                <div className="flex items-center gap-2">
                  <span className="bg-[#0e2640] text-[#F5EBBC] text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    10.53% OFF
                  </span>

                  <span className="text-base font-bold text-[#0e2640]">
                    ¥1,700
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    1回あたり{" "}
                    <strong className="font-semibold text-[#0e2640]">
                      1時間
                    </strong>{" "}
                    のセッション
                  </span>
                </li>

                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    週2回、日常会話から大学生活・友人関係・文化まで幅広いテーマ
                  </span>
                </li>

                <li className="flex items-start">
                  <Check
                    className="w-4 h-4 text-[#0e2640] mt-0.5 mr-2.5 shrink-0"
                    strokeWidth={2.5}
                  />

                  <span className="leading-tight">
                    より自然な韓国語を集中的に練習
                  </span>
                </li>
              </ul>
            </div>

            {/* 카드 하단 디자인용 가짜 버튼 (클릭 시 선택됨) */}
            <div className="w-full py-2.5 px-6 rounded-full bg-[#0e2640] text-[#F5EBBC] font-semibold text-sm text-center shadow-md">
              集中プランではじめる
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
