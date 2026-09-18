"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  MessageCircle,
  X, // 👈 이미지 뷰어 닫기 버튼용 아이콘 추가
} from "lucide-react";
import Image from "next/image";
import { PeekCard } from "./PeekCard";
import { TutorDetailModal } from "./TutorDetailModal";
import { MatchPlanModal } from "./MatchPlanModal";
import { getSafeImageUrl } from "@/lib/utils";
import { createMatch, MatchResult } from "@/actions/student/matchingActions";

export interface Tutor {
  id: string | number;
  nickname: string;
  furigana?: string;
  university: string;
  major: string;
  matchScore?: number;
  matchReasons?: string[];
  imageUrl: string;
  backgroundUrl: string;
  backgroundUrls?: string[]; // 👈 여러 배경 사진을 지원하기 위해 추가
  bio?: string;
  age?: number;
  tags?: string[];
  themeColor?: string;
}

export interface MatchingFormProps {
  isOpen?: boolean;
  initialTutors?: Tutor[];
  onStartChat?: (tutor: Tutor) => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
  delay: 0,
};

const cardMotionVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "75%" : "-75%",
    y: 12,
    rotate: dir > 0 ? 3 : -3,
    scale: 0.9,
    opacity: 0.6,
    filter: "blur(4px)",
    zIndex: 10,
    transition: springTransition,
  }),
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 20,
    transition: springTransition,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-75%" : "75%",
    y: 12,
    rotate: dir > 0 ? -3 : 3,
    scale: 0.9,
    opacity: 0.6,
    filter: "blur(4px)",
    zIndex: 5,
    transition: springTransition,
  }),
};

export function MatchingForm({
  isOpen = true,
  initialTutors = [],
  onStartChat,
}: MatchingFormProps) {
  const router = useRouter();

  // ==========================================
  // 모든 훅은 컴포넌트 최상단에 배치
  // ==========================================
  const [tutors] = useState<Tutor[]>(initialTutors);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailTutor, setSelectedDetailTutor] = useState<Tutor | null>(
    null,
  );
  const [isGridView, setIsGridView] = useState(false);

  // 플랜 선택 모달 상태
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [targetTutor, setTargetTutor] = useState<Tutor | null>(null);

  // 💡 이미지 뷰어 상태 추가
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  // 1. 프로필 사진 클릭 핸들러
  const handleProfileClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    setViewerImages([getSafeImageUrl(imageUrl)]);
    setCurrentViewIndex(0);
    setIsImageViewerOpen(true);
  };

  // 2. 배경 사진 클릭 핸들러 (여러 장이면 배열로 렌더링)
  const handleBackgroundClick = (e: React.MouseEvent, tutor: Tutor) => {
    e.stopPropagation();
    const bgUrls =
      tutor.backgroundUrls && tutor.backgroundUrls.length > 0
        ? tutor.backgroundUrls
        : [tutor.backgroundUrl || tutor.imageUrl];

    setViewerImages(bgUrls.map((url) => getSafeImageUrl(url)));
    setCurrentViewIndex(0);
    setIsImageViewerOpen(true);
  };

  const handleOpenMatchModal = (tutor: Tutor) => {
    setTargetTutor(tutor);
    setIsPlanModalOpen(true);
  };

  const handleConfirmPlanAndMatch = async (sessions: number) => {
    if (!targetTutor) return;

    try {
      const result: MatchResult = await createMatch(
        String(targetTutor.id),
        sessions,
      );

      if (!result.success) {
        alert(`매칭 요청 실패: ${result.error}`);
        return;
      }

      setIsPlanModalOpen(false);

      if (onStartChat) {
        onStartChat(targetTutor);
      } else {
        router.push(`/students`);
      }
    } catch (err: unknown) {
      console.error("매칭 처리 중 예외 발생:", err);
      alert("매칭 처리 중 오류가 발생했습니다.");
    }
  };

  const handleStartChatSession = async (tutor: Tutor) => {
    handleOpenMatchModal(tutor);
  };

  const handleNext = useCallback(() => {
    if (currentIndex < tutors.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsDetailOpen(false);
    }
  }, [currentIndex, tutors.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsDetailOpen(false);
    }
  }, [currentIndex]);

  const handleMatch = () => {
    if (tutors[currentIndex]) {
      handleOpenMatchModal(tutors[currentIndex]);
    }
  };

  useEffect(() => {
    tutors.forEach((tutor) => {
      if (tutor.imageUrl) {
        const img = new window.Image();
        img.src = getSafeImageUrl(tutor.imageUrl);
      }
    });
  }, [tutors]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen || isGridView || isImageViewerOpen) return;
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isDetailOpen, isGridView, isImageViewerOpen]);

  if (!isOpen) return null;

  if (tutors.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col relative items-center justify-center">
        <div className="text-slate-400 text-sm">
          登録されたチューターがありません。
        </div>
      </div>
    );
  }

  const currentTutor = tutors[currentIndex];
  const nextTutor =
    currentIndex < tutors.length - 1 ? tutors[currentIndex + 1] : null;
  const prevTutor = currentIndex > 0 ? tutors[currentIndex - 1] : null;
  const activeDetailTutor = selectedDetailTutor || currentTutor;
  const currentSafeImageUrl = getSafeImageUrl(currentTutor?.imageUrl);
  const currentSafeBgUrl = getSafeImageUrl(
    currentTutor?.backgroundUrl || currentTutor?.imageUrl,
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col relative">
      <main className="flex-1 flex flex-col w-full">
        <div className="w-full flex-1 flex flex-col font-sans overflow-x-clip py-4 sm:py-6">
          {!isGridView && (
            <div className="w-full max-w-5xl mx-auto px-4 flex items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
                  おすすめのチューター
                </h1>
              </div>
            </div>
          )}

          {!isGridView ? (
            <div className="flex-1 w-full flex flex-col items-center justify-start pt-2 sm:pt-4 pb-8 px-3 lg:px-8 overflow-visible">
              <div className="w-[85vw] max-w-[320px] lg:w-[340px] lg:max-w-[340px] h-[calc(100dvh-200px)] sm:h-[calc(100dvh-180px)] lg:h-[540px] min-h-[460px] max-h-[560px] relative overflow-visible flex items-center justify-center select-none">
                <AnimatePresence>
                  {prevTutor && <PeekCard tutor={prevTutor} type="prev" />}
                </AnimatePresence>
                <AnimatePresence>
                  {nextTutor && <PeekCard tutor={nextTutor} type="next" />}
                </AnimatePresence>

                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={cardMotionVariants}
                    initial="enter"
                    animate={
                      isDetailOpen
                        ? { ...cardMotionVariants.center, zIndex: 50 }
                        : "center"
                    }
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.35}
                    onDragEnd={(_, { offset, velocity }) => {
                      if (offset.x < -45 || velocity.x < -300) {
                        handleNext();
                      } else if (offset.x > 45 || velocity.x > 300) {
                        handlePrev();
                      }
                    }}
                    className={`absolute inset-0 w-full h-full overflow-hidden rounded-3xl shadow-2xl ${isDetailOpen ? "z-50" : "z-20"} cursor-grab active:cursor-grabbing border border-white/20 select-none`}
                    style={{ transformOrigin: "center center" }}
                  >
                    {/* 💡 배경 사진 영역 (클릭 가능하게 수정) */}
                    <div
                      className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl bg-slate-900 pointer-events-auto cursor-pointer"
                      onClick={(e) => handleBackgroundClick(e, currentTutor)}
                    >
                      <Image
                        src={currentSafeBgUrl}
                        alt={currentTutor.nickname}
                        fill
                        sizes="340px"
                        priority
                        loading="eager"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        background: `linear-gradient(135deg, ${currentTutor.themeColor || "#3B82F6"} 0%, #1E293B 100%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.76) 30%, rgba(0,0,0,0.3) 54%, transparent 72%)",
                      }}
                    />

                    <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/20 shadow-xs flex items-center gap-1">
                        <span className="font-extrabold">
                          {currentIndex + 1}
                        </span>
                        <span className="opacity-40">/</span>
                        <span>{tutors.length}</span>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 pb-20 flex flex-col justify-end text-white pointer-events-auto space-y-2"
                      style={{ textShadow: "0px 1px 4px rgba(0,0,0,0.6)" }}
                    >
                      <div className="flex justify-between items-end gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 💡 프로필 사진 영역 (클릭 가능하게 수정) */}
                          <div
                            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-slate-800 relative cursor-pointer hover:scale-105 transition-transform"
                            onClick={(e) =>
                              handleProfileClick(e, currentTutor.imageUrl)
                            }
                          >
                            <Image
                              src={currentSafeImageUrl}
                              alt={currentTutor.nickname}
                              fill
                              loading="eager"
                              sizes="48px"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            {/* 💡 text-base (모바일) -> sm:text-xl (PC) 로 폰트 크기 반응형 적용 */}
                            <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-baseline gap-1 sm:gap-2.5 whitespace-nowrap">
                              <span>{currentTutor.nickname}</span>

                              {currentTutor.furigana && (
                                // 💡 text-[10px] (모바일) -> sm:text-sm (PC)
                                <span className="text-[10px] sm:text-sm font-normal text-white/60">
                                  {currentTutor.furigana}
                                </span>
                              )}

                              {currentTutor.age && (
                                // 💡 text-xs (모바일) -> sm:text-base (PC)
                                <span className="text-xs sm:text-base font-normal opacity-90">
                                  ({currentTutor.age}歳)
                                </span>
                              )}
                            </h2>

                            <p className="text-[11px] sm:text-xs font-medium text-white/95 mt-0.5 tracking-wide truncate">
                              {currentTutor.university} · {currentTutor.major}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedDetailTutor(currentTutor);
                            setIsDetailOpen(true);
                          }}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all cursor-pointer border border-white/20 shrink-0"
                          title="詳細を見る"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {currentTutor.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-white/90 line-clamp-2 leading-relaxed pt-0.5 font-normal">
                        {currentTutor.bio}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => handlePrev()}
                  disabled={currentIndex === 0}
                  aria-label="前のチューター"
                  className={`hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white/60 text-[#405B78] items-center justify-center transition-all duration-200 hover:bg-white/75 hover:scale-105 active:scale-95 cursor-pointer ${
                    currentIndex === 0
                      ? "opacity-0 pointer-events-none -translate-x-2"
                      : "opacity-100"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => handleNext()}
                  disabled={currentIndex === tutors.length - 1}
                  aria-label="次のチューター"
                  className={`hidden lg:flex absolute -right-24 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white/60 text-[#405B78] items-center justify-center transition-all duration-200 hover:bg-white/75 hover:scale-105 active:scale-95 cursor-pointer ${
                    currentIndex === tutors.length - 1
                      ? "opacity-0 pointer-events-none translate-x-2"
                      : "opacity-100"
                  }`}
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3.5 z-30 pb-2 translate-y-[6px]">
                  <button
                    onClick={() => handlePrev()}
                    disabled={currentIndex === 0}
                    aria-label="前のチューター"
                    className={`lg:hidden w-12 h-12 rounded-full bg-white/50 backdrop-blur-md text-[#405B78] shadow-md flex items-center justify-center transition-all border border-white/60 cursor-pointer ${
                      currentIndex === 0
                        ? "opacity-0 pointer-events-none translate-x-4"
                        : "opacity-100 translate-x-0"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => handleMatch()}
                    aria-label="チューターマッチング申請"
                    className="w-14 h-14 rounded-full bg-[#007AFF]/60 backdrop-blur-md text-white shadow-lg hover:bg-[#007AFF]/80 border border-white/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Check className="w-7 h-7 stroke-[3.5]" />
                  </button>

                  <button
                    onClick={() => handleNext()}
                    disabled={currentIndex === tutors.length - 1}
                    aria-label="次のチューター"
                    className={`lg:hidden w-12 h-12 rounded-full bg-white/50 backdrop-blur-md text-[#405B78] shadow-md flex items-center justify-center transition-all border border-white/60 cursor-pointer ${
                      currentIndex === tutors.length - 1
                        ? "opacity-0 pointer-events-none -translate-x-4"
                        : "opacity-100 translate-x-0"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ===================== GRID VIEW ===================== */
            <div className="w-full max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    すべてのおすすめチューター
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsGridView(false);
                    setCurrentIndex(0);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>おすすめを再確認する</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {tutors.map((tutor) => {
                  const gridSafeImageUrl = getSafeImageUrl(tutor.imageUrl);
                  return (
                    <div
                      key={tutor.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-4">
                          <div
                            className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/25 shadow-sm shrink-0 bg-slate-100 relative cursor-pointer hover:scale-105 transition-transform z-10"
                            onClick={(e) =>
                              handleProfileClick(e, tutor.imageUrl)
                            }
                          >
                            <Image
                              src={gridSafeImageUrl}
                              alt={tutor.nickname}
                              fill
                              loading="eager"
                              sizes="56px"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-extrabold text-slate-900 text-base flex items-baseline gap-2">
                                <span>{tutor.nickname}</span>
                                {tutor.furigana && (
                                  <span className="text-xs font-normal text-slate-400">
                                    {tutor.furigana}
                                  </span>
                                )}
                                {tutor.age && (
                                  <span className="text-xs text-slate-500 font-medium">
                                    {tutor.age}歳
                                  </span>
                                )}
                              </h3>
                            </div>
                            <p className="text-xs font-semibold text-slate-600 mt-0.5 truncate">
                              {tutor.university} · {tutor.major}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {tutor.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                          {tutor.bio}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setSelectedDetailTutor(tutor);
                            setIsDetailOpen(true);
                          }}
                          className="flex-1 py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer text-center"
                        >
                          詳細を見る
                        </button>
                        <button
                          onClick={() => handleStartChatSession(tutor)}
                          className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#007AFF] hover:bg-[#0066CC] rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>マッチング相談</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <TutorDetailModal
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            tutor={activeDetailTutor}
            onStartChat={handleStartChatSession}
          />
        </div>
      </main>

      <button
        onClick={() => router.push("/chats")}
        className="fixed bottom-8 right-8 z-50 bg-[#0e2640] text-[#F5EBBC] p-4 rounded-full shadow-xl hover:bg-[#153457] transition-colors flex items-center justify-center cursor-pointer"
        aria-label="チャットを開く"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <MatchPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        tutor={targetTutor}
        onConfirmPlan={handleConfirmPlanAndMatch}
      />

      {/* ========================================== */}
      {/* 💡 전체화면 이미지 뷰어 모달 */}
      {/* ========================================== */}
      <AnimatePresence>
        {isImageViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsImageViewerOpen(false)}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(false);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* 여러 장일 경우 화살표 표시 */}
            {viewerImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition cursor-pointer z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentViewIndex((prev) =>
                      prev > 0 ? prev - 1 : viewerImages.length - 1,
                    );
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition cursor-pointer z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentViewIndex((prev) =>
                      prev < viewerImages.length - 1 ? prev + 1 : 0,
                    );
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* 메인 이미지 */}
            <div
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4 sm:p-12"
              onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫히지 않도록
            >
              <Image
                src={viewerImages[currentViewIndex]}
                alt="Enlarged View"
                fill
                loading="eager"
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>

            {/* 페이지네이션 뱃지 */}
            {viewerImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 px-5 py-2 rounded-full text-white text-sm font-bold tracking-widest z-50 border border-white/20">
                {currentViewIndex + 1} / {viewerImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MatchingForm;
