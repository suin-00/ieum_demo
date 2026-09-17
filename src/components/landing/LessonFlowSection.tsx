'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

/* ────────────────────────────────────────────────
   Brand colors
   #F0DDBD, #0E2640 은 사이트 전역 고정 컬러 — 변경 금지
──────────────────────────────────────────────── */
const YELLOW = '#F0DDBD';
const RED = '#EA526F';
const BLUE = '#23B5D3';
const TEAL = '#196E8A';
const NAVY = '#0E2640';

type Step = {
  label: string;
  subtitle?: string;
  time: string;
  description: string;
  illustBg: string;
};

const STEPS: Step[] = [
  {
    label: 'ウォームアップ',
    time: '5分',
    illustBg: '#FBF3E6',
    description:
      'まずは気軽なスモールトークからスタート。\n講師との自然な会話を通して、実際に韓国人と話す感覚に少しずつ慣れていきます。',
  },
  {
    label: 'Topic Priming',
    subtitle: '今日のテーマを準備',
    time: '8分',
    illustBg: '#E9F6FA',
    description:
      'その日のテーマに関連するキーワードや表現を先に確認します。\n大学生活や韓国の大学生文化など、実際の生活で使える表現を中心に学びます。',
  },
  {
    label: '自由会話',
    time: '15分',
    illustBg: '#FBEAED',
    description:
      '一つの質問からさらに次の質問へ。\n講師との自然な会話を続けながら、自分の考えを韓国語で伝える力と、実践的な会話感覚を身につけます。',
  },
  {
    label: '実践ロールプレイ',
    time: '15分',
    illustBg: '#E8F1F3',
    description:
      'コンビニ、学生寮、サークル、大学の友達との会話など、韓国で実際に経験するシチュエーションを再現します。\n講師と一緒に「実際に使う韓国語」を練習します。',
  },
  {
    label: '振り返り＆会話の広がり',
    time: '10分',
    illustBg: '#FBF3E6',
    description:
      'ロールプレイで使った表現や、うまく言えなかった部分を一緒に確認します。\nそこからもう一度自由な会話につなげながら、学んだ表現を自分の言葉として定着させます。',
  },
  {
    label: 'フィードバック',
    time: '5〜7分',
    illustBg: '#FBEAED',
    description:
      'その日のレッスンで迷った単語や表現、より自然な言い方を最後にもう一度整理します。\n講師から個別のフィードバックを受けて、次のレッスンにつなげます。',
  },
];

const STEP_COUNT = STEPS.length;
const WHEEL_COOLDOWN_MS = 320;

const pad = (n: number) => String(n).padStart(2, '0');

/* ────────────────────────────────────────────────
   Illustrations — simple, flat, shape-based
──────────────────────────────────────────────── */
const IllustCanvas = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 520 220" className="h-full w-full" aria-hidden="true" focusable="false">
    <g stroke={NAVY} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      {children}
    </g>
  </svg>
);

const IllustWarmup = () => (
  <IllustCanvas>
    {/* Left Bubble */}
    <path d="M120 60h140a20 20 0 0 1 20 20v40a20 20 0 0 1-20 20h-92l-16 18-3-18h-29a20 20 0 0 1-20-20V80a20 20 0 0 1 20-20z" fill="#FFFFFF" />
    <g fill={NAVY} stroke="none" opacity={0.4}>
      <circle cx="172" cy="100" r="5" />
      <circle cx="190" cy="100" r="5" />
      <circle cx="208" cy="100" r="5" />
    </g>
    
    {/* Right Bubble */}
    <path d="M260 96h130a18 18 0 0 1 18 18v34a18 18 0 0 1-18 18h-72l-14 16-3-16h-41a18 18 0 0 1-18-18v-34a18 18 0 0 1 18-18z" fill={YELLOW} />
    <g fill={NAVY} stroke="none" opacity={0.4}>
      <circle cx="307" cy="132" r="4.5" />
      <circle cx="325" cy="132" r="4.5" />
      <circle cx="343" cy="132" r="4.5" />
    </g>
  </IllustCanvas>
);

const IllustTopicPriming = () => (
  <IllustCanvas>
    {/* Staggered Keyword Cards (솔리드 컬러를 사용하여 밑에 깔린 선이 비치지 않음) */}
    <rect x="150" y="50" width="160" height="46" rx="10" fill="#CAE2E9" />
    <rect x="170" y="80" width="160" height="46" rx="10" fill="#C1E9F2" />
    <rect x="190" y="110" width="160" height="46" rx="10" fill="#FFFFFF" />
    
    {/* Lines in top card */}
    <path d="M210 128h100M210 142h60" stroke={NAVY} strokeOpacity={0.25} strokeWidth={5} />
    
    {/* Magnifying Glass */}
    <circle cx="340" cy="90" r="28" fill="none" stroke={RED} strokeWidth={3.5} />
    <path d="M360 110l18 18" stroke={RED} strokeWidth={6} />
    <circle cx="340" cy="90" r="5" fill={TEAL} stroke="none" />
  </IllustCanvas>
);

const IllustFreeTalk = () => (
  <IllustCanvas>
    {/* Left Chat Bubble */}
    <path d="M 140 60 h 90 a 12 12 0 0 1 12 12 v 40 a 12 12 0 0 1 -12 12 h -20 l 10 16 l -18 -16 h -62 a 12 12 0 0 1 -12 -12 v -40 a 12 12 0 0 1 12 -12 z" fill="#FFFFFF" />
    <path d="M 160 85 h 50 M 160 105 h 30" stroke={NAVY} strokeOpacity={0.15} strokeWidth={5} />

    {/* Right Chat Bubble */}
    <path d="M 290 90 h 90 a 12 12 0 0 1 12 12 v 40 a 12 12 0 0 1 -12 12 h -62 l -18 16 l 10 -16 h -20 a 12 12 0 0 1 -12 -12 v -40 a 12 12 0 0 1 12 -12 z" fill={BLUE} fillOpacity={0.9} />
    <path d="M 310 115 h 50 M 310 135 h 30" stroke="#FFFFFF" strokeOpacity={0.8} strokeWidth={5} />
  </IllustCanvas>
);


const IllustRoleplay = () => (
  <IllustCanvas>
    {/* Left Avatar (User) - 그림자를 없애고 중앙 쪽으로 약간 이동 */}
    <circle cx="170" cy="140" r="18" fill={NAVY} fillOpacity={0.08} />
    
    {/* Left Bubble (Yellow) */}
    <path d="M 110 50 h 70 a 10 10 0 0 1 10 10 v 25 a 10 10 0 0 1 -10 10 h -20 l 10 15 l -15 -15 h -45 a 10 10 0 0 1 -10 -10 v -25 a 10 10 0 0 1 10 -10 z" fill={YELLOW} />
    <path d="M 125 72 h 40" stroke={NAVY} strokeWidth={4} strokeOpacity={0.3} />

    {/* Right Avatar (오른쪽 공을 왼쪽으로 살짝 이동: cx="340") */}
    <circle cx="340" cy="140" r="18" fill={NAVY} fillOpacity={0.08} />

    {/* Right Bubble (White) */}
    <path d="M 330 50 h 70 a 10 10 0 0 1 10 10 v 25 a 10 10 0 0 1 -10 10 h -45 l -15 15 l 10 -15 h -20 a 10 10 0 0 1 -10 -10 v -25 a 10 10 0 0 1 10 -10 z" fill="#FFFFFF" />
    <path d="M 345 72 h 40" stroke={NAVY} strokeWidth={4} strokeOpacity={0.3} />
  </IllustCanvas>
);

const IllustReview = () => (
  <IllustCanvas>
    {/* Loop Arrow for 'Review' */}
    <path d="M 170 150 C 120 150, 120 70, 170 70" fill="none" stroke={YELLOW} strokeWidth={4} strokeDasharray="5 5" />
    <path d="M 160 60 l 10 10 l -10 10" fill="none" stroke={YELLOW} strokeWidth={4} />

    {/* Clipboard */}
    <rect x="200" y="40" width="120" height="140" rx="10" fill="#FFFFFF" />
    <rect x="240" y="30" width="40" height="15" rx="6" fill={TEAL} />
    
    {/* Checkmarks & Lines */}
    <path d="M 220 75 l 5 5 l 10 -10 M 220 105 l 5 5 l 10 -10 M 220 135 l 5 5 l 10 -10" stroke={RED} strokeWidth={3} fill="none" />
    <path d="M 245 75 h 50 M 245 105 h 50 M 245 135 h 30" stroke={NAVY} strokeWidth={4} strokeOpacity={0.15} />
  </IllustCanvas>
);

const IllustFeedback = () => (
  <IllustCanvas>
    {/* Document Base */}
    <rect x="190" y="40" width="140" height="140" rx="12" fill="#FFFFFF" />
    <path d="M 215 70 h 90 M 215 95 h 90 M 215 120 h 90 M 215 145 h 50" stroke={NAVY} strokeOpacity={0.15} strokeWidth={5} />
    
    {/* Highlight Line (Feedback indicator) */}
    <rect x="210" y="85" width="100" height="20" rx="6" fill={YELLOW} fillOpacity={0.6} stroke="none" />
    
    {/* Feedback Bubble */}
    <path d="M 292 44 h 50 a 10 10 0 0 1 10 10 v 20 a 10 10 0 0 1 -10 10 h -20 l -10 15 l -5 -15 h -25 a 10 10 0 0 1 -10 -10 v -20 a 10 10 0 0 1 10 -10 z" fill={RED} />
    <path d="M 306 64 l 5 5 l 12 -12" stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </IllustCanvas>
);

const ILLUSTRATIONS = [
  IllustWarmup,
  IllustTopicPriming,
  IllustFreeTalk,
  IllustRoleplay,
  IllustReview,
  IllustFeedback,
];

/* ────────────────────────────────────────────────
   Slide variants — 방향에 따라 위/아래로 유연하게 전환
──────────────────────────────────────────────── */
const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir >= 0 ? 22 : -22 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir >= 0 ? -22 : 22 }),
};

/* ────────────────────────────────────────────────
   Main component
──────────────────────────────────────────────── */
export default function LessonFlowSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const lockedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: 다음으로, -1: 이전으로

  const move = useCallback((delta: number) => {
    setDirection(delta >= 0 ? 1 : -1);
    setActiveIndex((prev) => (prev + delta + STEP_COUNT) % STEP_COUNT);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index >= activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // 오른쪽 카드 영역 위에서 휠 스크롤 시에만 단계 전환 — 그 외에는 일반 페이지 스크롤 그대로 동작
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockedRef.current) return;
      if (Math.abs(e.deltaY) < 4) return;

      lockedRef.current = true;
      move(e.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [move]);

  const step = STEPS[activeIndex];
  const Illust = ILLUSTRATIONS[activeIndex];

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* heading */}
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0E2640] md:text-3xl">
              レッスンの流れ
            </h2>
            <span className="h-[3px] w-10 rounded-full" style={{ backgroundColor: RED }} />
          </div>

          <div className="flex items-stretch gap-4 lg:gap-8">
            {/* LEFT — step list (일반 스크롤 영역, 휠 캡처 없음) */}
            <div className="flex w-full max-w-[280px] shrink-0 flex-col justify-center gap-3">
              {STEPS.map((s, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={s.label}
                    onClick={() => goTo(i)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300"
                    style={{
                      backgroundColor: active ? NAVY : '#FFFFFF',
                      border: active ? 'none' : '1px solid rgba(14,38,64,0.08)',
                    }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                      style={{
                        backgroundColor: active ? '#FFFFFF' : 'rgba(14,38,64,0.06)',
                        color: NAVY,
                      }}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className="flex-1 text-sm font-bold"
                      style={{ color: active ? '#FFFFFF' : NAVY }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="shrink-0 text-xs font-semibold"
                      style={{ color: active ? 'rgba(255,255,255,0.65)' : '#94A3B8' }}
                    >
                      {s.time}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — 카드 섹션. 이 영역 위에서만 휠 스크롤이 단계 전환에 반응 */}
            <div
              ref={cardRef}
              className="flex h-[360px] flex-1 flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(14,38,64,0.07)] md:h-[400px] md:p-7"
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex h-full flex-col"
                >
                  <div
                    className="h-[130px] w-full overflow-hidden rounded-2xl md:h-[150px]"
                    style={{ backgroundColor: step.illustBg }}
                  >
                    <Illust />
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
                          style={{ backgroundColor: `${BLUE}26`, color: TEAL }}
                        >
                          {pad(activeIndex + 1)}
                        </span>
                        <div>
                          <h3 className="text-lg font-black leading-tight text-[#0E2640] md:text-xl">
                            {step.label}
                          </h3>
                          {step.subtitle && (
                            <p className="mt-0.5 text-xs font-semibold text-slate-400">{step.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-slate-400">{step.time}</span>
                    </div>

                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-500 md:text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
    </section>
  );
}