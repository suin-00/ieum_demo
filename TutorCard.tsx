'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  MessageCircle
} from 'lucide-react';

export interface Tutor {
  id: number;
  name: string;
  university: string;
  major: string;
  matchScore: number;
  matchReasons?: string[];
  imageUrl: string;
  bio?: string;
  age?: number;
  tags?: string[];
  themeColor?: string;
}

// 아바타, 상세 모달, 그리드 뷰 등에서 공통으로 사용되는 프로필 이미지
export const UNIFIED_PROFILE_IMAGE = 'https://github.com/user-attachments/assets/a6cd9eb3-f396-442f-b16c-cfbbe5b69fb4';

export const tutors: Tutor[] = [
  {
    id: 1,
    name: 'キム・ジス',
    university: 'ソウル大学校',
    major: 'コンピュータ工学部',
    matchScore: 98,
    matchReasons: ['フロントエンドへの関心', 'React専門', '実務経験'],
    imageUrl: 'https://wsrv.nl/?url=https://github.com/user-attachments/assets/3c66bf87-f03d-4b1e-bc7c-224ce4e4280b&w=600&output=webp&q=80',
    bio: 'はじめまして！フロントエンド開発に深い関心を持っているキム・ジスです。主にReactに関連するメンタリングを行っており、実務で使用されるコンポーネントパターンを丁寧にお教えしたいと思っています。',
    age: 23,
    tags: ['Frontend', 'React', 'UX/UI'],
    themeColor: '#3B82F6'
  },
  {
    id: 2,
    name: 'イ・ミホ',
    university: '延世大学校',
    major: 'ソフトウェア学部',
    matchScore: 95,
    matchReasons: ['バックエンドアーキテクチャ', '丁寧なフィードバック', '体系的なカリキュラム'],
    imageUrl: 'https://wsrv.nl/?url=https://github.com/user-attachments/assets/66c2c6dc-a803-4671-8eae-3b3c6e0cc67e&w=600&output=webp&q=80',
    bio: 'フルスタックを目指すバックエンドエンジニアのイ・ミホです。Node.jsベースのサーバー構築やAPI設計、フロントエンドとの連携について実践中心でメンタリングいたします。',
    age: 24,
    tags: ['Backend', 'Node.js', 'API設計'],
    themeColor: '#10B981'
  },
  {
    id: 3,
    name: 'パク・ソヨン',
    university: '高麗大学校',
    major: 'サイバー国防学科',
    matchScore: 92,
    matchReasons: ['セキュリティインフラ', 'クリーンコード', '親切な説明'],
    imageUrl: 'https://wsrv.nl/?url=https://github.com/user-attachments/assets/39d90ae5-9079-4c15-8df0-8fb69487ed5a&w=600&output=webp&q=80',
    bio: '安全で堅牢なWebサービス構築に関心があります。Webセキュリティの基礎からフロントエンドレンダリングの最適化まで、広い視野を持てるようサポートします。',
    age: 22,
    tags: ['Security', 'Optimization', 'Web'],
    themeColor: '#8B5CF6'
  },
  {
    id: 4,
    name: 'チェ・ウジン',
    university: '成均館大学校',
    major: 'ソフトウェア学科',
    matchScore: 89,
    matchReasons: ['モバイルアプリ', 'React Native', '実践プロジェクト'],
    imageUrl: 'https://wsrv.nl/?url=https://github.com/user-attachments/assets/1b5dd8f7-eb2c-48d5-9fbd-a2e04ce8bbe0&w=600&output=webp&q=80',
    bio: 'Web技術でモバイルアプリまで！React Nativeを活用したクロスプラットフォームアプリ開発が好きです。1つのコードで2つのアプリを作る楽しさをぜひ体験してみてください。',
    age: 25,
    tags: ['Mobile', 'React Native', 'App'],
    themeColor: '#FF7F50'
  },
  {
    id: 5,
    name: 'チョン・ハウン',
    university: '漢陽大学校',
    major: '情報システム工学科',
    matchScore: 88,
    matchReasons: ['アルゴリズム', 'Web基礎', '親しみやすいメンタリング'],
    imageUrl: 'https://wsrv.nl/?url=https://github.com/user-attachments/assets/86a8f729-ba62-44dc-82ec-1ddef5b4d4f8&w=600&output=webp&q=80',
    bio: 'コーディングが初めての方も大歓迎です！JavaScriptの基礎からしっかり固め、自分だけの最初のWebサイトを成功裏にデプロイするまで一緒に行いましょう。',
    age: 21,
    tags: ['JavaScript', 'Basic', 'Deploy'],
    themeColor: '#EC4899'
  }
];

// 렌더링 시 재생성을 방지하기 위해 애니메이션 설정 객체들을 컴포넌트 외부로 분리 (최적화)
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
  delay: 0,
};

const carouselVariants = {
  active: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 10, transition: springTransition },
  next: { x: '75%', y: 12, rotate: 3, scale: 0.9, opacity: 0.6, filter: 'blur(4px)', zIndex: 0, transition: springTransition },
  prev: { x: '-75%', y: 12, rotate: -3, scale: 0.9, opacity: 0.6, filter: 'blur(4px)', zIndex: 0, transition: springTransition },
};

const cardMotionVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '75%' : '-75%',
    y: 12,
    rotate: dir > 0 ? 3 : -3,
    scale: 0.9,
    opacity: 0.6,
    filter: 'blur(4px)',
    zIndex: 10,
    transition: springTransition,
  }),
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    zIndex: 20,
    transition: springTransition,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-75%' : '75%',
    y: 12,
    rotate: dir > 0 ? -3 : 3,
    scale: 0.9,
    opacity: 0.6,
    filter: 'blur(4px)',
    zIndex: 5,
    transition: springTransition,
  }),
};

// 중복 사용되는 이전/다음 카드 컴포넌트를 분리 (최적화)
const PeekCard = React.forwardRef<HTMLDivElement, { tutor: Tutor; type: 'prev' | 'next' }>(({ tutor, type }, ref) => {
  const isNext = type === 'next';
  const label = isNext ? '次のチューター' : '前のチューター';
  const positionClass = isNext ? 'right-3.5' : 'left-3.5';

  return (
    <motion.div
      ref={ref}
      key={`${type}-peek-${tutor.id}`}
      variants={carouselVariants}
      initial={type}
      animate={type}
      exit={type}
      className="flex flex-col absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/20 select-none pointer-events-none"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900 pointer-events-none">
        <img
          src={tutor.imageUrl}
          alt={tutor.name}
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div 
        className="absolute inset-0 pointer-events-none opacity-10" 
        style={{ background: `linear-gradient(135deg, ${tutor.themeColor || '#3B82F6'} 0%, #1E293B 100%)` }}
      />
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 30%, transparent 60%)' }}
      />
      
      <div className={`absolute top-3.5 ${positionClass} bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20`}>
        {!isNext && <ChevronLeft className="w-3 h-3" />}
        <span>{label}</span>
        {isNext && <ChevronRight className="w-3 h-3" />}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/80 shadow-xs shrink-0 bg-slate-800">
            <img src={UNIFIED_PROFILE_IMAGE} alt={tutor.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold truncate">{tutor.name}</span>
              <span className="text-xs opacity-90">{tutor.age}歳</span>
            </div>
            <p className="text-[11px] text-white/80 mt-0.5 font-medium truncate">{tutor.university} · {tutor.major}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

PeekCard.displayName = 'PeekCard';

export default function TutorCard() {
  const router = useRouter();

  const handleStartChat = (tutor: Tutor) => {
    router.push(`/chats/${tutor.id}`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailTutor, setSelectedDetailTutor] = useState<Tutor | null>(null);
  const [isGridView, setIsGridView] = useState(false);

  const handleNext = useCallback(() => {
    if (currentIndex < tutors.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsDetailOpen(false);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsDetailOpen(false);
    }
  }, [currentIndex]);

  const handleMatch = () => {
    handleStartChat(tutors[currentIndex]);
  };

  useEffect(() => {
    tutors.forEach((tutor) => {
      if (tutor.imageUrl) {
        const img = new Image();
        img.src = tutor.imageUrl;
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen || isGridView) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isDetailOpen, isGridView]);

  const currentTutor = tutors[currentIndex];
  const nextTutor = currentIndex < tutors.length - 1 ? tutors[currentIndex + 1] : null;
  const prevTutor = currentIndex > 0 ? tutors[currentIndex - 1] : null;
  const activeDetailTutor = selectedDetailTutor || currentTutor;

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col relative">
      {/* Main Matching Area */}
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
                
                {/* Previous & Next Card Peeks (분리된 컴포넌트 사용) */}
                <AnimatePresence>
                  {prevTutor && <PeekCard tutor={prevTutor} type="prev" />}
                </AnimatePresence>
                <AnimatePresence>
                  {nextTutor && <PeekCard tutor={nextTutor} type="next" />}
                </AnimatePresence>

                {/* Active Card */}
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={cardMotionVariants}
                    initial="enter"
                    animate={isDetailOpen ? { ...cardMotionVariants.center, zIndex: 50 } : 'center'}
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
                    className={`absolute inset-0 w-full h-full overflow-hidden rounded-3xl shadow-2xl ${isDetailOpen ? 'z-50' : 'z-20'} cursor-grab active:cursor-grabbing border border-white/20 select-none`}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl bg-slate-900 pointer-events-none">
                      <img
                        src={currentTutor.imageUrl}
                        alt={currentTutor.name}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-10" 
                      style={{ background: `linear-gradient(135deg, ${currentTutor.themeColor || '#3B82F6'} 0%, #1E293B 100%)` }}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none" 
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.76) 30%, rgba(0,0,0,0.3) 54%, transparent 72%)' }}
                    />

                    <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/20 shadow-xs flex items-center gap-1">
                        <span className="font-extrabold">{currentIndex + 1}</span>
                        <span className="opacity-40">/</span>
                        <span>{tutors.length}</span>
                      </div>
                    </div>

                    <div 
                      className="absolute bottom-0 left-0 right-0 p-4 pb-20 flex flex-col justify-end text-white pointer-events-auto space-y-2"
                      style={{ textShadow: '0px 1px 4px rgba(0,0,0,0.6)' }}
                    >
                      <div className="flex justify-between items-end gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-slate-800">
                            <img src={UNIFIED_PROFILE_IMAGE} alt={currentTutor.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                {currentTutor.name}{' '}
                                <span className="text-lg font-normal opacity-90">{currentTutor.age}歳</span>
                              </h2>
                            </div>
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

                {/* Desktop Navigation Arrows */}
                <button
                  onClick={() => handlePrev()}
                  disabled={currentIndex === 0}
                  aria-label="前のチューター"
                  className={`hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white/60 text-[#405B78] items-center justify-center transition-all duration-200 hover:bg-white/75 hover:scale-105 active:scale-95 cursor-pointer ${
                    currentIndex === 0 ? 'opacity-0 pointer-events-none -translate-x-2' : 'opacity-100'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => handleNext()}
                  disabled={currentIndex === tutors.length - 1}
                  aria-label="次のチューター"
                  className={`hidden lg:flex absolute -right-24 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white/60 text-[#405B78] items-center justify-center transition-all duration-200 hover:bg-white/75 hover:scale-105 active:scale-95 cursor-pointer ${
                    currentIndex === tutors.length - 1 ? 'opacity-0 pointer-events-none translate-x-2' : 'opacity-100'
                  }`}
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Floating Action Buttons */}
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3.5 z-30 pb-2 translate-y-[6px]">
                  <button
                    onClick={() => handlePrev()}
                    disabled={currentIndex === 0}
                    aria-label="前のチューター"
                    className={`lg:hidden w-12 h-12 rounded-full bg-white/50 backdrop-blur-md text-[#405B78] shadow-md flex items-center justify-center transition-all border border-white/60 cursor-pointer ${
                      currentIndex === 0 ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
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
                      currentIndex === tutors.length - 1 ? 'opacity-0 pointer-events-none -translate-x-4' : 'opacity-100 translate-x-0'
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
                {tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/25 shadow-sm shrink-0 bg-slate-100">
                          <img
                            src={UNIFIED_PROFILE_IMAGE}
                            alt={tutor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-slate-900 text-base">{tutor.name}</h3>
                            <span className="text-xs text-slate-500 font-medium">{tutor.age}歳</span>
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
                        onClick={() => handleStartChat(tutor)}
                        className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#007AFF] hover:bg-[#0066CC] rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>マッチング相談</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TUTOR DETAIL MODAL ===================== */}
          <AnimatePresence>
            {isDetailOpen && (
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
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                >
                  <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight">チューター詳細情報</h3>
                      <button
                        onClick={() => setIsDetailOpen(false)}
                        className="p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                        title="閉じる"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3.5 mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 select-none">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 shadow-sm">
                        <img
                          src={UNIFIED_PROFILE_IMAGE}
                          alt={activeDetailTutor.name}
                          className="w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-slate-900 text-base">{activeDetailTutor.name}</h4>
                          <span className="text-xs text-slate-500 font-medium">{activeDetailTutor.age}歳</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{activeDetailTutor.university} · {activeDetailTutor.major}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pb-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          自己紹介
                        </h4>
                        <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                          {activeDetailTutor.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          専門分野 & 技術スタック
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeDetailTutor.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-blue-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          おすすめポイント
                        </h4>
                        <ul className="space-y-2">
                          {activeDetailTutor.matchReasons?.map((reason) => (
                            <li key={reason} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                              </div>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 mt-auto">
                      <button
                        onClick={() => {
                          setIsDetailOpen(false);
                          handleStartChat(activeDetailTutor);
                        }}
                        className="w-full py-3 bg-[#007AFF] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0066CC] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{activeDetailTutor.name} チューターと相談開始</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Temporary Floating Chat Navigation Button */}
      <button
        onClick={() => router.push('/chats')}
        className="fixed bottom-8 right-8 z-50 bg-[#0e2640] text-[#F5EBBC] p-4 rounded-full shadow-xl hover:bg-[#153457] transition-colors flex items-center justify-center cursor-pointer"
        aria-label="チャットを開く"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
}
