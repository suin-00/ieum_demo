"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ChevronRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Bot,
} from "lucide-react";

type Lang = "kr" | "jp";
type ViewState = "home" | "tutors" | "login" | "community";

interface Tutor {
  id: string;
  name: string;
  university: string;
  major: string;
  rating: number;
  reviewCount: number;
  bio: string;
  languages: string[];
  price: number;
  image: string;
}

const FEMALE_IMG =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

const uiDict = {
  kr: {
    hero: {
      title: "가장 확실한 1:1 언어 학습,\nIEUM과 함께 시작하세요",
      desc: "검증된 전공자·원어민 튜터와 실시간으로 대화하고, 내 목표에 딱 맞는 맞춤형 커리큘럼으로 외국어 실력을 빠르게 향상시키세요.",
      cta: "튜터 찾기",
      secondaryCta: "서비스 소개",
    },
    homeExtra: {
      reviewsTitle: "수강생들의 생생한 후기",
      reviewsDesc:
        "IEUM을 통해 실력을 키우고 목표를 달성한 수강생들의 이야기입니다.",
      promoTitle: "언어 학습의 새로운 기준, IEUM",
      promoDesc:
        "엄선된 튜터와의 안전한 매칭부터 실시간 번역 지원까지, 학습에만 집중할 수 있는 환경을 제공합니다.",
      calendarTitle: "주요 어학 시험 일정",
      calendarDesc:
        "올해 다가오는 주요 어학 시험 일정을 확인하고 목표를 준비해보세요.",
      moreTutors: "모든 튜터 보기",
    },
    tutors: {
      title: "인기 튜터 목록",
      desc: "지금 가장 주목받고 있는 IEUM의 검증된 튜터들을 만나보세요.",
    },
  },
  jp: {
    hero: {
      title: "確実な1:1語学学習、\nIEUMとともに始めましょう",
      desc: "厳選された専攻・ネイティブチューターとリアルタイムで会話し、あなたの目標に合わせたカリキュラムで語学力を早く向上させましょう。",
      cta: "チューターを探す",
      secondaryCta: "サービス紹介",
    },
    homeExtra: {
      reviewsTitle: "受講生のリアルなレビュー",
      reviewsDesc:
        "IEUMを通じて実力を伸ばし、目標を達成した受講生たちのストーリーです。",
      promoTitle: "語学学習の新しい基準、IEUM",
      promoDesc:
        "厳選されたチューターとの安全なマッチングからリアルタイム翻訳サポートまで、学習に集中できる環境を提供します。",
      calendarTitle: "主な語学試験スケジュール",
      calendarDesc:
        "今年迫っている主な語学試験の日程を確認し、目標に向けた準備をしましょう。",
      moreTutors: "すべてのチューターを見る",
    },
    tutors: {
      title: "人気チューター一覧",
      desc: "今最も注目されているIEUMの信頼できるチューターたち会いましょう。",
    },
  },
};

const REVIEWS = [
  {
    id: "1",
    rating: 5,
    author: "김민지",
    text: {
      kr: "원어민 튜터님과 매일 대화하면서 회화 두려움이 완전히 사라졌어요! 실시간 번역 기능 덕분에 막히는 부분도 즉시 해결했습니다.",
      jp: "ネイティブのチューターと毎日話すうちに、会話の恐怖心が完全に消えました！リアルタイム翻訳機能のおかげで、詰まる部分もすぐに解決できました。",
    },
  },
  {
    id: "2",
    rating: 5,
    author: "박서준",
    text: {
      kr: "시험 일정부터 맞춤 커리큘럼까지 한 번에 관리할 수 있어서 정말 편리합니다. 강추해요!",
      jp: "試験の日程からカスタマイズカリキュラムまで一括管理できて本当に便利です。超おすすめです！",
    },
  },
  {
    id: "3",
    rating: 5,
    author: "이지은",
    text: {
      kr: "대학생 전공자 튜터님이라 그런지 제 눈높이에 맞춰서 꼼꼼히 설명해 주셔서 실력이 빠르게 느는 게 느껴져요.",
      jp: "大学生の専攻チューターだからか、私の目線に合わせて丁寧に説明してくれて、実力が早く伸びているのが実感できます。",
    },
  },
];

const EXAMS = [
  {
    id: "1",
    name: "JLPT (제1회)",
    dday: "D-35",
    date: "2026. 07. 05",
    color: "bg-rose-50 text-rose-700",
    desc: {
      kr: "일본어 능력 시험 N1~N5 접수 및 대비",
      jp: "日本語能力試験 N1~N5 受付および対策",
    },
  },
  {
    id: "2",
    name: "TOEIC",
    dday: "D-12",
    date: "2026. 03. 28",
    color: "bg-sky-50 text-sky-800",
    desc: { kr: "정기 토익 시험 성적 대비", jp: "定期TOEIC試験のスコア対策" },
  },
  {
    id: "3",
    name: "TOPIK II",
    dday: "D-50",
    date: "2026. 05. 17",
    color: "bg-amber-50 text-[#9c7d42]",
    desc: {
      kr: "한국어능력시험 중·고급 대비",
      jp: "韓国語能力試験 中・上級対策",
    },
  },
  {
    id: "4",
    name: "JPT",
    dday: "D-20",
    date: "2026. 04. 19",
    color: "bg-slate-100 text-[#0E2640]",
    desc: {
      kr: "비즈니스 일본어 실력 평가 대비",
      jp: "ビジネス日本語能力評価対策",
    },
  },
];

const TUTORS: Tutor[] = [
  {
    id: "t1",
    name: "김지수",
    university: "경북대학교 컴퓨터학부",
    major: "Computer Science",
    rating: 5.0,
    reviewCount: 42,
    bio: "친절하고 꼼꼼하게 기초부터 탄탄하게 잡아드립니다.",
    languages: ["한국어", "영어"],
    price: 25000,
    image: FEMALE_IMG,
  },
  {
    id: "t2",
    name: "Yamada Rin",
    university: "도쿄대학교",
    major: "Language Education",
    rating: 4.9,
    reviewCount: 38,
    bio: "자연스러운 네이티브 표현과 비즈니스 일본어를 마스터해보세요!",
    languages: ["일본어", "한국어"],
    price: 30000,
    image: FEMALE_IMG,
  },
  {
    id: "t3",
    name: "David Smith",
    university: "하버드대학교",
    major: "English Literature",
    rating: 4.8,
    reviewCount: 56,
    bio: "재미있는 프리토킹으로 영어에 대한 자신감을 심어드립니다.",
    languages: ["영어"],
    price: 35000,
    image: FEMALE_IMG,
  },
];

export default function HomeView() {
  const lang: Lang = "kr";
  const [, setView] = useState<ViewState>("home");
  const isLoggedIn = false;
  const t = uiDict[lang];

  const [isMuted, setIsMuted] = useState(true);
  const [featureTab, setFeatureTab] = useState<"matching" | "translation">(
    "matching",
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHeroCta = () => {
    if (!isLoggedIn) {
      setView("login");
    } else {
      setView("tutors");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F7] text-[#0E2640] font-sans selection:bg-[#0E2640] selection:text-[#f0ddbd]">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100dvh] flex items-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="https://github.com/user-attachments/assets/1048676a-ebb7-4320-abe4-c4fd881f9f17"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover brightness-105 md:brightness-100"
          />
          {/* 배경색(#FAF8F7)과 자연스럽게 블렌딩되는 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F7] via-[#FAF8F7]/90 to-transparent md:bg-gradient-to-r md:from-[#FAF8F7] md:via-[#FAF8F7]/90 md:to-transparent md:w-[70%] z-10" />
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-3 right-4 md:bottom-12 md:right-12 z-30 w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#0E2640] shadow-sm border border-white/50 hover:bg-white/60 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-16 md:py-0 flex flex-col justify-end md:justify-center h-full min-h-[100dvh]">
          <div className="flex flex-col items-start max-w-xl mt-auto md:mt-0 md:pl-16 lg:pl-20 w-full">
            {/* 서브 포인트 컬러 배지 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0ddbd]/40 border border-[#f0ddbd] text-[#0E2640] font-bold text-xs mb-6 shadow-sm">
              <Sparkles size={14} className="text-[#0E2640]" />
              <span>Verified 1:1 Language Partner</span>
            </div>

            <h1 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-black leading-[1.2] md:leading-[1.15] tracking-tight mb-4 md:mb-6 text-[#0E2640] whitespace-pre-line break-keep">
              {t.hero.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-3 mb-8 md:mb-10 max-w-lg leading-relaxed whitespace-normal break-keep font-medium">
              {t.hero.desc}
            </p>

            <div className="flex flex-row gap-3 md:gap-4 w-full sm:w-auto">
              {/* 메인 포인트 컬러 버튼 */}
              <motion.button
                onClick={handleHeroCta}
                whileTap={{ scale: 0.98 }}
                className="w-[140px] md:w-auto px-0 md:px-8 py-3.5 md:py-4 bg-[#0E2640] text-[#f0ddbd] rounded-xl font-extrabold text-[15px] md:text-lg shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-1 md:gap-2 shrink-0 border border-[#0E2640]"
              >
                {t.hero.cta}
                <ChevronRight size={18} className="hidden md:block" />
              </motion.button>

              <motion.button
                onClick={handleHeroCta}
                whileTap={{ scale: 0.98 }}
                className="w-[140px] md:w-auto px-0 md:px-8 py-3.5 md:py-4 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#0E2640] rounded-xl font-extrabold text-[15px] md:text-lg hover:bg-white shadow-sm transition-all flex items-center justify-center shrink-0"
              >
                {t.hero.secondaryCta}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE REVIEWS SECTION */}
      <section className="py-24 bg-white border-y border-slate-200/60 overflow-hidden">
        <div className="w-full max-w-full px-4 sm:px-6 mx-auto text-center overflow-hidden mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E2640] mb-4">
            {t.homeExtra.reviewsTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed break-keep whitespace-normal">
            {t.homeExtra.reviewsDesc}
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 px-3 py-4 animate-marquee">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-80 bg-[#FAF8F7] p-6 rounded-2xl border border-slate-200/60 flex flex-col shrink-0 shadow-sm"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 font-semibold mb-4 leading-relaxed break-keep">
                  &quot;{review.text[lang]}&quot;
                </p>
                <div className="mt-auto font-bold text-slate-400 text-sm">
                  - {review.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IEUM PROMO BANNER */}
      <section className="px-4 md:px-8 py-24 w-full max-w-7xl mx-auto box-border overflow-hidden">
        <div className="w-full max-w-full mx-auto rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col box-border">
          <div className="pt-10 md:pt-14 px-6 md:px-12 text-center flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0E2640] mb-3 break-words max-w-full leading-tight">
              {t.homeExtra.promoTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed break-keep whitespace-normal mb-8 max-w-2xl">
              {t.homeExtra.promoDesc}
            </p>

            <div className="inline-flex items-center p-1.5 bg-[#FAF8F7] rounded-full mb-10 md:mb-14 border border-slate-200">
              <button
                onClick={() => setFeatureTab("matching")}
                className={`px-6 py-2.5 rounded-full text-sm md:text-base transition-all ${featureTab === "matching" ? "bg-[#0E2640] text-[#f0ddbd] font-bold shadow-sm" : "text-slate-600 hover:bg-slate-200 font-semibold"}`}
              >
                {lang === "kr" ? "1:1 검증된 매칭" : "1:1検証済みマッチング"}
              </button>
              <button
                onClick={() => setFeatureTab("translation")}
                className={`px-6 py-2.5 rounded-full text-sm md:text-base transition-all ${featureTab === "translation" ? "bg-[#0E2640] text-[#f0ddbd] font-bold shadow-sm" : "text-slate-600 hover:bg-slate-200 font-semibold"}`}
              >
                {lang === "kr" ? "실시간 AI 번역" : "リアルタイムAI翻訳"}
              </button>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-12 flex-1 flex">
            {featureTab === "matching" && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0E2640] mb-6 leading-snug">
                    {lang === "kr"
                      ? "원어민·전공자 튜터와 나누는 가장 자연스러운 한국어"
                      : "ネイティブ・専攻チューターと話す最も自然な韓国語"}
                  </h3>
                  <ul className="flex flex-col gap-5 mb-8">
                    {[
                      lang === "kr"
                        ? "학력 및 신원 인증 완료된 엄선된 튜터풀"
                        : "学歴および身元確認が完了した厳選されたチューター",
                      lang === "kr"
                        ? "학습자의 관심사(K-Drama, 비즈니스, 자격증) 맞춤 필터링"
                        : "学習者の関心事（K-Drama、ビジネス、資格）に合わせたフィルタリング",
                      lang === "kr"
                        ? "첫 수업 전 무료 1:1 채팅 상담으로 수업 방향 조율"
                        : "初回レッスン前に無料の1:1チャット相談でレッスンの方向性を調整",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#f0ddbd] text-[#0E2640] flex items-center justify-center">
                          <CheckCircle2
                            size={14}
                            className="fill-current text-[#0E2640]"
                          />
                        </div>
                        <span className="text-slate-700 font-medium text-[15px] leading-relaxed break-keep">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <button
                      onClick={() => setView("tutors")}
                      className="inline-flex items-center gap-2 bg-[#0E2640] hover:bg-slate-900 text-[#f0ddbd] font-bold py-3 px-6 rounded-xl transition-all shadow-md"
                    >
                      {lang === "kr" ? "튜터 둘러보기" : "チューターを見る"}{" "}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-2xl bg-gradient-to-br from-[#FAF8F7] to-[#f0ddbd]/20 border border-slate-200/60 overflow-hidden flex items-center justify-center p-6">
                  <div className="relative z-10 w-full max-w-[320px] bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm shrink-0">
                          <img
                            src={FEMALE_IMG}
                            className="w-full h-full object-cover scale-110"
                            alt="mockup avatar"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#0E2640] text-lg">
                              지수
                            </span>
                            <ShieldCheck className="w-4 h-4 text-[#0E2640]" />
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                            <GraduationCap className="w-3.5 h-3.5" /> 연세대학교
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-current" /> 5.0
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-4 line-clamp-2">
                      &quot;드라마 대본으로 배우는 실전 한국어! 자연스러운
                      억양을 집중적으로 코칭합니다.&quot;
                    </p>
                    <div className="bg-[#FAF8F7] rounded-xl p-3 border border-slate-200/60 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0E2640] text-[#f0ddbd] flex items-center justify-center shrink-0">
                        <MessageCircle size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#0E2640]">
                          {lang === "kr"
                            ? "무료 상담 요청하기"
                            : "無料相談を申し込む"}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {lang === "kr"
                            ? "수업 전 목표를 조율해보세요"
                            : "レッスン前の目標を調整しましょう"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {featureTab === "translation" && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0E2640] mb-6 leading-snug">
                    {lang === "kr"
                      ? "언어가 서툴러도 걱정 없이, 실시간 다국어 AI 서포트"
                      : "言葉が苦手でも心配なく、リアルタイム多言語AIサポート"}
                  </h3>
                  <ul className="flex flex-col gap-5 mb-8">
                    {[
                      lang === "kr"
                        ? "채팅창 내 실시간 한·일 양방향 번역 기능"
                        : "チャットルーム内のリアルタイム韓・日双方向翻訳機能",
                      lang === "kr"
                        ? "문맥에 맞는 자연스러운 비즈니스 / 일상 표현 추천"
                        : "文脈に合った自然なビジネス/日常表現の推奨",
                      lang === "kr"
                        ? "모르는 단어 즉시 탭하여 발음 및 예문 확인"
                        : "知らない単語をすぐにタップして発音と例文を確認",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#f0ddbd] text-[#0E2640] flex items-center justify-center">
                          <Sparkles
                            size={14}
                            className="fill-current text-[#0E2640]"
                          />
                        </div>
                        <span className="text-slate-700 font-medium text-[15px] leading-relaxed break-keep">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <button
                      onClick={() => setView("community")}
                      className="inline-flex items-center gap-2 bg-[#0E2640] hover:bg-slate-900 text-[#f0ddbd] font-bold py-3 px-6 rounded-xl transition-all shadow-md"
                    >
                      {lang === "kr"
                        ? "커뮤니티 둘러보기"
                        : "コミュニティを見る"}{" "}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-2xl bg-gradient-to-br from-[#FAF8F7] to-[#f0ddbd]/20 border border-slate-200/60 overflow-hidden flex items-center justify-center p-6">
                  <div className="relative z-10 w-full max-w-[340px] flex flex-col gap-4">
                    <div className="flex flex-col gap-1 items-end w-full">
                      <div className="bg-[#0E2640] text-[#f0ddbd] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] text-sm shadow-sm font-medium">
                        明日、面接の練習をお願いしてもいいですか？
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold mr-1">
                        10:42 AM
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 items-start w-full">
                      <div className="flex items-center gap-2 mb-1 pl-1">
                        <Bot size={14} className="text-[#0E2640]" />
                        <span className="text-[11px] font-bold text-[#0E2640]">
                          {lang === "kr"
                            ? "AI 실시간 번역"
                            : "AIリアルタイム翻訳"}
                        </span>
                      </div>
                      <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-[15px] font-medium shadow-sm">
                        내일 면접 연습을 부탁드려도 될까요?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-[#FAF8F7] border-t border-slate-200/60 p-6 md:px-12 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-black text-[#0E2640] mb-1">
                  98.7
                  <span className="text-2xl md:text-3xl text-[#0E2640]">.</span>
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {lang === "kr" ? "수업 만족도" : "授業満足度"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-black text-[#0E2640] mb-1">
                  1,200
                  <span className="text-2xl md:text-3xl text-amber-600">+</span>
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {lang === "kr" ? "누적 매칭 완료" : "累計マッチング"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                <span className="text-3xl md:text-4xl font-black text-[#0E2640] mb-1">
                  100
                  <span className="text-2xl md:text-3xl text-emerald-600">
                    %
                  </span>
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {lang === "kr" ? "신원 및 학력 검증" : "本人・学歴確認済"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAM CALENDAR */}
      <section className="px-4 md:px-8 mx-auto w-full max-w-7xl mb-24 box-border">
        <div className="w-full max-w-full px-4 sm:px-6 mx-auto text-center overflow-hidden mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2640] mb-4">
            {t.homeExtra.calendarTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            {t.homeExtra.calendarDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-black text-[#0E2640]">
                  {exam.name}
                </h3>
                <div
                  className={`px-2.5 py-1 rounded-md font-black text-xs ${exam.color}`}
                >
                  {exam.dday}
                </div>
              </div>
              <p className="text-slate-500 font-bold text-xs sm:text-sm mb-6 h-10">
                {exam.desc[lang]}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400 font-medium">Date</span>
                <span className="text-slate-700 font-bold">{exam.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR TUTORS SECTION */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="w-full max-w-full px-4 sm:px-6 mx-auto text-center overflow-hidden mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E2640] mb-4">
            {t.tutors.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            {t.tutors.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TUTORS.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-[#0E2640]">
                    {tutor.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {tutor.university}
                  </p>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-1">
                    <Star size={14} className="fill-current" /> {tutor.rating} (
                    {tutor.reviewCount})
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm font-medium mb-6 line-clamp-2">
                {tutor.bio}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-extrabold text-[#0E2640]">
                  ₩{tutor.price.toLocaleString()}원{" "}
                  <span className="text-xs text-slate-400 font-medium">
                    /회
                  </span>
                </span>
                <button className="px-4 py-2 bg-[#0E2640] text-[#f0ddbd] rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors">
                  프로필 보기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setView("tutors")}
            className="px-8 py-4 bg-white border border-slate-300 text-[#0E2640] rounded-xl font-bold text-lg shadow-sm hover:bg-[#0E2640] hover:text-[#f0ddbd] transition-all flex items-center justify-center gap-2"
          >
            {t.homeExtra.moreTutors}
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
