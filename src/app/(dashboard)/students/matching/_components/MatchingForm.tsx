"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { TutorDetailModal } from "./TutorDetailModal";
import { TutorList } from "./TutorList";
import Image from "next/image";

export interface Tutor {
  id: string;
  name: string;
  university: string;
  major: string;
  imageUrl: string;
  bio?: string;
  age?: number;
  tags?: string[];
}

export interface MatchingFormProps {
  isOpen?: boolean;
  initialTutors?: Tutor[];
  onStartChat?: (tutor: Tutor) => void;
}

export function MatchingForm({
  isOpen = true,
  initialTutors = [],
  onStartChat,
}: MatchingFormProps) {
  const router = useRouter();
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailTutor, setSelectedDetailTutor] = useState<Tutor | null>(
    null,
  );
  const [isGridView, setIsGridView] = useState(false);

  // TODO: 추후 Supabase 데이터 fetch 연동 지점
  useEffect(() => {
    // supabase.from('profiles')...
  }, []);

  const handleStartChatSession = (tutor: Tutor) => {
    if (onStartChat) {
      onStartChat(tutor);
    } else {
      router.push(`/chats/${tutor.id}`);
    }
  };

  const handleNext = useCallback(() => {
    if (tutors.length === 0) return;
    if (currentIndex < tutors.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsDetailOpen(false);
    } else {
      setIsGridView(true);
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
      handleStartChatSession(tutors[currentIndex]);
    }
  };

  // 유효한 이미지 주소인지 체크하고, 비어있으면 기본 아바타를 반환하는 안전장치
  const getSafeImageUrl = (url?: string) => {
    if (
      !url ||
      typeof url !== "string" ||
      url.trim() === "" ||
      url === "undefined" ||
      url === "null"
    ) {
      return "/images/unified_profile.png"; // 기본 통일 아바타
    }
    if (url.startsWith("images/")) {
      return `/${url}`;
    }
    return url;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen || isGridView) return;
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isDetailOpen, isGridView]);

  if (!isOpen) return null;

  if (tutors.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col pt-16 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          등록된 추천 チューターがありません。
        </div>
      </div>
    );
  }

  const currentTutor = tutors[currentIndex];
  const nextTutor =
    currentIndex < tutors.length - 1 ? tutors[currentIndex + 1] : null;
  const prevTutor = currentIndex > 0 ? tutors[currentIndex - 1] : null;

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

  const carouselVariants = {
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

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col pt-16 font-sans overflow-x-clip">
      <Navbar />

      <div className="w-full flex-1 flex flex-col py-4 sm:py-6">
        {!isGridView && (
          <div className="w-full max-w-5xl mx-auto px-4 mb-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              おすすめのチューター
            </h1>
          </div>
        )}

        {!isGridView ? (
          <div className="flex-1 w-full flex flex-col items-center justify-center pt-2 sm:pt-4 pb-8 px-3 lg:px-8 overflow-visible">
            <div className="w-[85vw] max-w-[320px] lg:w-85 lg:max-w-85 h-[calc(100dvh-200px)] sm:h-[calc(100dvh-180px)] lg:h-135 min-h-115 max-h-140 relative overflow-visible flex items-center justify-center select-none mt-2">
              <AnimatePresence>
                {prevTutor && (
                  <motion.div
                    key={`prev-${prevTutor.id}`}
                    variants={carouselVariants}
                    initial="prev"
                    animate="prev"
                    exit="prev"
                    className="flex flex-col absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/20 select-none pointer-events-none"
                  >
                    <Image
                      src={getSafeImageUrl(prevTutor.imageUrl)}
                      alt={prevTutor.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {nextTutor && (
                  <motion.div
                    key={`next-${nextTutor.id}`}
                    variants={carouselVariants}
                    initial="next"
                    animate="next"
                    exit="next"
                    className="flex flex-col absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/20 select-none pointer-events-none"
                  >
                    <Image
                      src={getSafeImageUrl(nextTutor?.imageUrl)}
                      alt={nextTutor.name}
                      fill // 💡 이 속성을 추가해줍니다 (부모 영역을 가득 채우게 됩니다)
                      sizes="(max-width: 768px) 100vw, 340px" // 선택사항이지만 권장됨
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
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
                    if (offset.x < -45 || velocity.x < -300) handleNext();
                    else if (offset.x > 45 || velocity.x > 300) handlePrev();
                  }}
                  className={`absolute inset-0 w-full h-full overflow-hidden rounded-3xl shadow-2xl ${isDetailOpen ? "z-50" : "z-20"} cursor-grab active:cursor-grabbing border border-white/20 select-none`}
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl bg-slate-900 pointer-events-none">
                    <Image
                      src={getSafeImageUrl(currentTutor.imageUrl)}
                      alt={currentTutor.name}
                      fill
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.76) 30%, transparent 72%)",
                    }}
                  />

                  <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/20 shadow-xs flex items-center gap-1">
                      <span className="font-extrabold">{currentIndex + 1}</span>
                      <span className="opacity-40">/</span>
                      <span>{tutors.length}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 flex flex-col justify-end text-white pointer-events-auto space-y-2">
                    <div className="flex justify-between items-end gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-slate-800">
                          <Image
                            src={getSafeImageUrl(currentTutor.imageUrl)}
                            alt={currentTutor.name}
                            className="w-full h-full object-cover"
                            width={48}
                            height={48}
                          />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-2xl font-extrabold text-white tracking-tight truncate">
                            {currentTutor.name}{" "}
                            {currentTutor.age && (
                              <span className="text-lg font-normal opacity-90">
                                {currentTutor.age}歳
                              </span>
                            )}
                          </h2>
                          <p className="text-xs font-medium text-white/95 mt-0.5 tracking-wide truncate">
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

              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3.5 z-30 pb-2 translate-y-1.5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`w-12 h-12 rounded-full bg-white text-slate-600 shadow-md flex items-center justify-center transition-all border border-white/60 cursor-pointer ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleMatch}
                  className="w-14 h-14 rounded-full bg-[#007AFF] text-white shadow-lg hover:bg-[#0066CC] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Check className="w-7 h-7 stroke-[3.5]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white text-slate-600 shadow-md flex items-center justify-center transition-all border border-white/60 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <TutorList
            tutors={tutors}
            onResetCarousel={() => {
              setIsGridView(false);
              setCurrentIndex(0);
            }}
            onOpenDetail={(t) => {
              setSelectedDetailTutor(t);
              setIsDetailOpen(true);
            }}
            onStartChat={handleStartChatSession}
          />
        )}

        <TutorDetailModal
          isOpen={isDetailOpen}
          tutor={selectedDetailTutor}
          onClose={() => setIsDetailOpen(false)}
          onStartChat={handleStartChatSession}
        />
      </div>
    </div>
  );
}

export default MatchingForm;
