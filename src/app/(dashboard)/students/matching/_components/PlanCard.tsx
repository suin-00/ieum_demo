"use client";

import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function PlanCard() {
  return (
    <div className="min-h-[calc(100vh-5rem)] w-full bg-[#F9FAFB] flex flex-col justify-center items-center font-sans overflow-x-clip px-4">
      <main className="w-full max-w-4xl flex flex-col justify-center items-center py-6">
        {/* Header Section */}
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

        {/* Pricing Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Card 1: Standard Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
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
                  ¥7,500
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
                  ¥1,875
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

            <button className="w-full py-2.5 px-6 rounded-full bg-slate-100 text-[#0e2640] font-semibold text-sm transition-colors hover:bg-slate-200 focus:outline-none">
              選択する
            </button>
          </motion.div>

          {/* Card 2: Intensive Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#0e2640] shadow-[0_8px_30px_rgba(14,38,64,0.12)] flex flex-col justify-between relative mt-3 md:mt-0"
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
                  ¥13,500
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
                    10% OFF
                  </span>

                  <span className="text-base font-bold text-[#0e2640]">
                    ¥1,687
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

            <button className="w-full py-2.5 px-6 rounded-full bg-[#0e2640] text-[#F5EBBC] font-semibold text-sm transition-colors hover:bg-[#0a1d31] shadow-md">
              集中プランではじめる
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
