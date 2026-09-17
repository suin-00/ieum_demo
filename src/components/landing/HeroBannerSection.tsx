"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users } from "lucide-react";
import { FadeIn } from "./FadeIn";

export interface HeroBannerSectionProps {
  ctaButton?: React.ReactNode;
}

export function HeroBannerSection({ ctaButton }: HeroBannerSectionProps) {
  const [isStudentIdVisible, setIsStudentIdVisible] = useState(false);

  const handleTriggerStudentId = useCallback(() => {
    setIsStudentIdVisible((prev) => !prev);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-24 md:pt-32 pb-20 md:pb-28 lg:pb-32 bg-[#F8FAFC] overflow-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out 1.5s infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full translate-y-2 sm:translate-y-3 lg:translate-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center z-20">
            <FadeIn delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1E293B] leading-[1.18] mb-6 tracking-tight">
                はじめての
                <br />
                <span className="relative inline-block my-1">
                  <span className="relative z-10">韓国留学</span>
                  <span className="absolute bottom-1.5 left-0 right-0 h-3.5 bg-[#FDE047] z-0 opacity-85 rounded-sm"></span>
                </span>
                を、
                <br />
                <span className="text-[#57799E]">ひとりにしない。</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="text-base sm:text-lg text-[#1E293B] font-bold mb-3 leading-snug">
                韓国の現役大学生と一緒に準備する、韓国留学。
              </p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg mb-8">
                IEUMは、韓国留学を準備する学生と、韓国の現役大学生をつなぐサービスです。語学だけでなく、大学生活のすべてを一緒に準備できます。
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div>{ctaButton}</div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 relative w-full flex items-center justify-center py-6">
            <div className="w-85 h-85 sm:w-105 sm:h-105 rounded-full bg-linear-to-tr from-blue-100/70 via-indigo-50/50 to-yellow-100/40 blur-3xl absolute -z-10" />

            <div
              onMouseEnter={handleTriggerStudentId}
              onClick={handleTriggerStudentId}
              className="relative w-full max-w-105 h-95 sm:h-110 flex items-center justify-center -translate-x-6 sm:-translate-x-9 lg:-translate-x-12 translate-y-2 sm:translate-y-2.5"
            >
              <motion.div
                initial={{ opacity: 0, y: -20, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute -top-3 sm:-top-5 right-0 sm:-right-4 -rotate-6 z-10 bg-[#B32424] text-white rounded-xl p-3 sm:p-3.5 w-34.5 sm:w-38.5 h-50.5 sm:h-56.5 shadow-2xl border border-red-900/40 select-none overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
                <div className="relative z-10 text-center pt-0.5">
                  <span className="font-serif text-[#E5B842] text-[11px] sm:text-[12px] font-bold tracking-[0.35em] pl-1 drop-shadow-xs">
                    日本国
                  </span>
                </div>
                <div className="relative z-10 flex flex-col items-center my-auto py-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 text-[#E5B842] drop-shadow-xs">
                    <svg
                      viewBox="0 0 60 60"
                      fill="currentColor"
                      className="w-full h-full"
                    >
                      <g transform="translate(30, 30)">
                        {[
                          0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5,
                          225, 247.5, 270, 292.5, 315, 337.5,
                        ].map((angle, idx) => (
                          <path
                            key={idx}
                            d="M -2.4 -5.5 C -3.8 -13 -3.4 -21 0 -23.5 C 3.4 -21 3.8 -13 2.4 -5.5 Z"
                            transform={`rotate(${angle})`}
                          />
                        ))}
                        <circle cx="0" cy="0" r="4.8" fill="#E5B842" />
                        <circle cx="0" cy="0" r="2.2" fill="#B32424" />
                      </g>
                    </svg>
                  </div>
                  <div className="text-center font-serif text-[#E5B842] mt-1.5 tracking-[0.2em] pl-0.5">
                    <div className="text-[10px] sm:text-[11px] font-black leading-tight">
                      JAPAN
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-bold leading-tight mt-0.5">
                      PASSPORT
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-center pb-0.5">
                  <div className="w-5 h-3 border border-[#E5B842] rounded-[1px] flex items-center justify-center relative bg-[#B32424]">
                    <div className="w-full h-px bg-[#E5B842]" />
                    <div className="w-2 h-2 rounded-full border border-[#E5B842] bg-[#B32424] absolute flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-[#E5B842]" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 10 }}
                animate={{ opacity: 1, y: 0, rotate: 12 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-10 sm:bottom-14 -right-4 sm:-right-8 rotate-12 z-10 bg-white/95 backdrop-blur-xs rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-lg w-48.75 sm:w-55 select-none"
              >
                <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5 mb-1.5">
                  <div>
                    <span className="text-sm sm:text-base font-black text-[#1E293B]">
                      JPN
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold ml-1">
                      TOKYO
                    </span>
                  </div>
                  <span className="text-xs text-[#23B5D3] font-bold">✈</span>
                  <div>
                    <span className="text-sm sm:text-base font-black text-[#1E293B]">
                      KOR
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold ml-1">
                      ICN
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold">
                  <span>KE 001 · SEAT 12A</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    BOARDING
                  </span>
                </div>
                <div className="mt-2 h-3.5 flex items-center gap-0.5 opacity-70">
                  {[
                    3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2,
                    1, 3,
                  ].map((w, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-slate-800 rounded-xs"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </motion.div>

              <AnimatePresence>
                {isStudentIdVisible && (
                  <motion.div
                    key="student-id-card"
                    initial={{ opacity: 0, y: 18, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.92,
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      mass: 0.8,
                    }}
                    className="absolute -top-8 sm:-top-11 -translate-y-2 left-1/2 -translate-x-1/2 ml-3 sm:ml-4 z-30 select-none pointer-events-auto"
                  >
                    <div className="bg-white/75 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-white/80 shadow-xl flex items-center gap-2.5 min-w-38.75 sm:min-w-43">
                      <div className="relative shrink-0">
                        <div className="w-8 h-9 sm:w-9 sm:h-10 rounded-lg bg-[#405B78] flex items-center justify-center text-white shadow-xs border border-white overflow-hidden">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[11px] sm:text-xs font-black text-[#1E293B] tracking-tight truncate">
                          韓国大学校
                        </span>
                        <span className="text-[8px] sm:text-[8.5px] text-slate-500 font-semibold tracking-tight mt-0.5">
                          KOREA UNIV · 学生証
                        </span>
                        <div className="flex items-center gap-[1.5px] mt-1 opacity-60">
                          {[3, 1, 2, 4, 1, 2, 3, 1, 2, 4, 1, 2].map((w, i) => (
                            <div
                              key={i}
                              className="h-1.5 bg-slate-700 rounded-2xs"
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                onMouseEnter={handleTriggerStudentId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-20 w-47.5 sm:w-53 h-98.75 sm:h-108.75 rounded-[2.2rem] sm:rounded-[2.5rem] border-[5px] sm:border-[6px] border-slate-800/95 bg-white shadow-2xl overflow-hidden ml-6 sm:ml-8 mt-10 flex flex-col justify-between"
              >
                <div className="pt-2 px-6 sm:px-7 pb-1.5 bg-white flex items-center justify-between relative select-none border-b border-slate-50">
                  <span className="text-[9px] font-bold text-slate-800 ml-0.5">
                    9:41
                  </span>
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-14 h-3.5 bg-black rounded-full flex items-center justify-end pr-1.5 shadow-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] border border-slate-800" />
                  </div>
                  <div className="flex items-center gap-1 mr-0.5">
                    <span className="text-[8px] font-bold text-slate-600">
                      5G
                    </span>
                    <div className="w-3.5 h-1.5 border border-slate-700 rounded-xs p-px flex items-center">
                      <div className="h-full w-2 bg-slate-800 rounded-2xs" />
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-extrabold text-[#1E293B]">
                      IEUM Chat
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold bg-slate-200/60 px-1.5 py-0.5 rounded">
                    1:1
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50/50 space-y-2 text-[10px] font-medium flex-1 overflow-hidden">
                  <div className="flex justify-start">
                    <div className="bg-white text-[#1E293B] border border-slate-200/80 rounded-xl rounded-tl-none px-2.5 py-1.5 shadow-2xs max-w-[85%]">
                      안녕하세요! 👋
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#405B78] text-white rounded-xl rounded-tr-none px-2.5 py-1.5 shadow-2xs max-w-[85%]">
                      はじめまして！
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white text-[#1E293B] border border-slate-200/80 rounded-xl rounded-tl-none px-2.5 py-1.5 shadow-2xs max-w-[85%]">
                      수업 어때요?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#405B78] text-white rounded-xl rounded-tr-none px-2.5 py-1.5 shadow-2xs max-w-[85%]">
                      とても楽しい！
                    </div>
                  </div>
                </div>

                <div className="bg-white border-t border-slate-100">
                  <div className="p-1.5 flex items-center gap-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-5 px-2 text-[9px] text-slate-400 flex items-center">
                      メッセージ...
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#405B78] flex items-center justify-center text-white text-[9px]">
                      ➤
                    </div>
                  </div>
                  <div className="pb-1 pt-0.5 flex justify-center">
                    <div className="w-20 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </motion.div>

              <div className="absolute -bottom-2 sm:-bottom-4 left-0 sm:-left-4 translate-x-4 sm:translate-x-5 animate-float-delayed z-30 select-none">
                <div className="flex flex-col items-center relative">
                  <div className="absolute -top-3.5 -right-2.5 z-20 rotate-12 flex items-end">
                    <div className="w-[1.5px] h-4 bg-slate-600 rounded-full" />
                    <div className="w-6 h-4 sm:w-6.5 sm:h-4.5 bg-white border border-slate-300 rounded-[1px] shadow-xs relative flex items-center justify-center overflow-hidden p-px mb-0.5">
                      <div className="absolute top-[1.2px] left-[1.2px] flex flex-col gap-[0.6px]">
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                      </div>
                      <div className="absolute bottom-[1.2px] left-[1.2px] flex flex-col gap-[0.6px]">
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                      </div>
                      <div className="absolute top-[1.2px] right-[1.2px] flex flex-col gap-[0.6px]">
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                      </div>
                      <div className="absolute bottom-[1.2px] right-[1.2px] flex flex-col gap-[0.6px]">
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                        <div className="w-[2.6px] h-[0.6px] bg-black" />
                      </div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full overflow-hidden flex flex-col border-[0.5px] border-slate-200 shadow-2xs">
                        <div className="w-full h-1/2 bg-[#CD2E3A]" />
                        <div className="w-full h-1/2 bg-[#0047A0]" />
                      </div>
                    </div>
                  </div>

                  <div className="w-5 h-4 sm:h-5 border-x-2 border-t-2 border-slate-700 rounded-t-xs bg-slate-100/40 relative flex justify-center mb-px">
                    <div className="w-3 h-1 bg-slate-800 rounded-xs mt-px" />
                  </div>

                  <div className="w-13 sm:w-15 h-18 sm:h-20 bg-linear-to-b from-yellow-100 via-yellow-200 to-amber-200 rounded-xl border-2 border-amber-300 shadow-xl relative overflow-hidden flex flex-col justify-between p-1.5">
                    <div className="w-5 h-1 bg-slate-700 rounded-full mx-auto" />
                    <div className="absolute inset-x-2 top-3 bottom-3 flex justify-evenly pointer-events-none opacity-40">
                      <div className="w-[1.5px] h-full bg-amber-600 rounded-full" />
                      <div className="w-[1.5px] h-full bg-amber-600 rounded-full" />
                      <div className="w-[1.5px] h-full bg-amber-600 rounded-full" />
                    </div>
                    <div className="absolute top-2.5 left-1 z-10 -rotate-8 bg-rose-500 text-[5px] font-black text-white px-1 py-px rounded-xs shadow-2xs border border-white/70 tracking-tighter">
                      SEOUL
                    </div>
                    <div className="absolute top-7 right-1 z-10 rotate-12 bg-[#196E8A] text-[4.5px] font-extrabold text-white px-1 py-[0.8px] rounded-xs shadow-2xs border border-white/70 flex items-center gap-px">
                      <span>KOR</span>
                      <span className="text-[4px]">✈</span>
                    </div>
                    <div className="absolute bottom-5 left-1.5 z-10 -rotate-12 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-800 flex items-center justify-center text-[5.5px] font-black shadow-2xs border border-white/80">
                      ★
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-auto">
                      <div className="bg-slate-800 text-[6px] font-black text-white px-1 py-0.5 rounded-xs shadow-2xs tracking-tighter">
                        IEUM
                      </div>
                      <div className="w-2.5 h-3 bg-white/90 border border-slate-300 rounded-xs shadow-2xs flex flex-col items-center justify-center">
                        <div className="w-1.5 h-0.5 bg-amber-500 rounded-full mb-0.5" />
                        <div className="w-1.5 h-px bg-slate-400" />
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500/50 rounded-tl-lg pointer-events-none" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500/50 rounded-tr-lg pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500/50 rounded-bl-lg pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500/50 rounded-br-lg pointer-events-none" />
                  </div>

                  <div className="w-11 sm:w-13 flex justify-between px-1 -mt-0.5">
                    <div className="w-2 h-2.5 bg-slate-800 rounded-b-full border border-slate-900 shadow-xs" />
                    <div className="w-2 h-2.5 bg-slate-800 rounded-b-full border border-slate-900 shadow-xs" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-9 sm:bottom-11 right-2 sm:-right-2 z-30 select-none pointer-events-none drop-shadow-md text-2xl sm:text-[28px]">
                📍
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
