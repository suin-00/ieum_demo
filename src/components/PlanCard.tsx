'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function PlanCard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-4xl mb-6 text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0e2640] mb-2 tracking-tight">
            あなたに合ったプランを
          </h1>
        </motion.div>

        {/* Pricing Cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start">
          
          {/* Card 1: Standard Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col h-full"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#0e2640] mb-2">スタンダードプラン</h2>
              <p className="text-slate-500 text-sm h-10">{/* Fixed height for alignment */}
                無理なく、会話を習慣に。
              </p>
            </div>

            <div className="mb-5 flex items-baseline">
              <span className="text-4xl font-extrabold text-[#0e2640] tracking-tight">¥7,500</span>
              <span className="text-slate-500 ml-2 font-medium">/ 月4回</span>
            </div>

            {/* Price Per Session Callout */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">1回あたりの料金</span>
              <div className="text-right">
                <span className="text-lg font-bold text-[#0e2640]">¥1,875</span>
              </div>
            </div>

            <div className="flex-1">
              <ul className="space-y-3 mb-6 text-sm text-slate-600">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">1回あたり <strong className="font-semibold text-[#0e2640]">1時間</strong> のセッション</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">週1回、日常会話や韓国の大学生活・文化がテーマ</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">少しずつ韓国語で話すことに慣れていく</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3 px-6 rounded-full bg-slate-100 text-[#0e2640] font-semibold text-base transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2">
              選択する
            </button>
          </motion.div>

          {/* Card 2: Intensive Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0e2640] shadow-[0_8px_30px_rgba(14,38,64,0.12)] flex flex-col h-full relative"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#0e2640] text-[#F5EBBC] text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                人気・おすすめ
              </span>
            </div>

            <div className="mb-6 mt-1">
              <h2 className="text-xl font-bold text-[#0e2640] mb-2">集中プラン</h2>
              <p className="text-slate-500 text-sm h-10">
                もっと話して、もっと自然な韓国語へ。
              </p>
            </div>

            <div className="mb-5 flex items-baseline">
              <span className="text-4xl font-extrabold text-[#0e2640] tracking-tight">¥13,500</span>
              <span className="text-slate-500 ml-2 font-medium">/ 月8回</span>
            </div>

            {/* Price Per Session Callout - Highlighted */}
            <div className="bg-[#0e2640]/5 rounded-2xl p-4 mb-6 border border-[#0e2640]/20 flex items-center justify-between">
              <span className="text-sm font-medium text-[#0e2640]">1回あたりの料金</span>
              <div className="text-right flex items-center gap-2">
                <span className="bg-[#0e2640] text-[#F5EBBC] text-[10px] font-bold px-2 py-1 rounded-md">
                  10% OFF
                </span>
                <span className="text-lg font-bold text-[#0e2640]">¥1,687</span>
              </div>
            </div>

            <div className="flex-1">
              <ul className="space-y-3 mb-6 text-sm text-slate-600">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">1回あたり <strong className="font-semibold text-[#0e2640]">1時間</strong> のセッション</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">週2回、日常会話から大学生活・友人関係・文化まで幅広いテーマ</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#0e2640] mt-0.5 mr-3 shrink-0" strokeWidth={2.5} />
                  <span className="leading-tight">より自然な韓国語を集中的に練習</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3 px-6 rounded-full bg-[#0e2640] text-[#F5EBBC] font-semibold text-base transition-colors hover:bg-[#0a1d31] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0e2640] focus:ring-offset-2">
              集中プランではじめる
            </button>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
