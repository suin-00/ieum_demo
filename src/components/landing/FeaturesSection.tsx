"use client";

import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

const INK = "#16324F";

type Palette = {
  bg: string;
  paper: string;
  b: string;
  point: string;
  badge: string;
};

const PALETTES: Palette[] = [
  {
    bg: "#DDEBF8",
    paper: "#FFFFFF",
    b: "#F2DDBE",
    point: "#2F6FD0",
    badge: "#C9DFF4",
  },
  {
    bg: "#DCEFE3",
    paper: "#FFFFFF",
    b: "#E9D3AE",
    point: "#3C8F6A",
    badge: "#C4E4D3",
  },
  {
    bg: "#FBEFCB",
    paper: "#FFFFFF",
    b: "#F2C9AF",
    point: "#D9663A",
    badge: "#F4E2AC",
  },
  {
    bg: "#E7E3F5",
    paper: "#FFFFFF",
    b: "#F1DFB8",
    point: "#6152BE",
    badge: "#D6D0EC",
  },
];

type Feature = {
  label: string;
  title: string;
  description: React.ReactNode;
};

const featuresData: Feature[] = [
  {
    label: "志望大学の現役学生とマッチング",
    title: "行きたい大学の\n「リアル」がわかる",
    description: (
      <>
        SKYをはじめとする韓国主要大学の現役学生とマッチング。
        <br />
        <br />
        自分が行きたい大学の授業やキャンパスライフについて、実際に通っている学生だからこそわかるリアルな情報を、留学前から知ることができます。
      </>
    ),
  },
  {
    label: "語学だけじゃない、大学生活まで準備",
    title: "韓国での「生活」に\n備える",
    description: (
      <>
        単なる韓国語レッスンではありません。
        <br />
        <br />
        履修登録、寮生活、サークル文化、友人関係など、韓国の大学で実際に必要になる情報やコミュニケーションまで一緒に準備します。
      </>
    ),
  },
  {
    label: "会話中心の実践トレーニング",
    title: "「覚える」から\n「使える」韓国語へ",
    description: (
      <>
        単語や文法を覚えるだけではなく、ロールプレイやミッション形式のアクティビティを通して、韓国で実際に遭遇する場面を練習します。
        <br />
        <br />
        知っている韓国語を、実際に話せる韓国語へ変えていきます。
      </>
    ),
  },
  {
    label: "渡韓前から、入学後まで",
    title: "留学生活に寄り添う\n継続サポート",
    description: (
      <>
        渡韓前は、韓国語への不安や現地生活に対する「わからない」を一つずつ解消。そして入学後も、現地の大学生とのつながりを通して、韓国人の友達をつくったり、大学のコミュニティに自然に溶け込んだりできるようサポートします。
        <br />
        <br />
        「留学準備」で終わらず、韓国での大学生活が始まったその先まで。
      </>
    ),
  },
];

const Obj = ({
  delay = 0,
  children,
  ...rest
}: { delay?: number; children: React.ReactNode } & React.ComponentProps<
  typeof motion.g
>) => (
  <motion.g
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay, ease: "easeOut" }}
    {...rest}
  >
    {children}
  </motion.g>
);

const Canvas = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 400 460"
    preserveAspectRatio="xMidYMid meet"
    className="h-full w-full"
    aria-hidden="true"
    focusable="false"
  >
    <g
      stroke={INK}
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </g>
  </svg>
);

// 1. 매칭 씬 - 우측 하단 동그라미(배지)와 체크 모양 삭제 반영
const VisualMatch = ({ p }: { p: Palette }) => (
  <Canvas>
    {/* 배경 프로필 카드 (매칭 상대) */}
    <Obj delay={0.05} transform="rotate(6 210 210)">
      <rect x="140" y="80" width="180" height="260" rx="24" fill={p.bg} />
      <rect
        x="160"
        y="100"
        width="140"
        height="120"
        rx="16"
        fill={p.paper}
        fillOpacity={0.6}
      />
      <circle cx="230" cy="160" r="30" fill={p.b} stroke="none" />
      <rect
        x="160"
        y="240"
        width="80"
        height="12"
        rx="6"
        fill={p.point}
        fillOpacity={0.15}
        stroke="none"
      />
      <rect
        x="160"
        y="260"
        width="100"
        height="8"
        rx="4"
        fill={p.point}
        fillOpacity={0.1}
        stroke="none"
      />
    </Obj>

    {/* 메인 프로필 카드 */}
    <Obj delay={0.15} transform="rotate(-3 180 230)">
      {/* 그림자 효과 */}
      <rect
        x="74"
        y="114"
        width="200"
        height="280"
        rx="24"
        fill={INK}
        fillOpacity={0.05}
        stroke="none"
      />

      <rect x="70" y="110" width="200" height="280" rx="24" fill={p.paper} />
      <rect x="90" y="130" width="160" height="130" rx="16" fill={p.b} />
      <circle
        cx="170"
        cy="195"
        r="35"
        fill={p.point}
        fillOpacity={0.15}
        stroke="none"
      />
      <path
        d="M150 210 Q170 180 190 210"
        stroke={p.point}
        strokeWidth={3}
        fill="none"
      />

      {/* 정보 라인 */}
      <rect
        x="90"
        y="285"
        width="100"
        height="12"
        rx="6"
        fill={INK}
        fillOpacity={0.15}
        stroke="none"
      />
      <rect
        x="90"
        y="310"
        width="140"
        height="8"
        rx="4"
        fill={INK}
        fillOpacity={0.08}
        stroke="none"
      />
      <rect
        x="90"
        y="330"
        width="80"
        height="8"
        rx="4"
        fill={INK}
        fillOpacity={0.08}
        stroke="none"
      />

      {/* 요청하신 정체불명의 동그라미 및 체크 아이콘 삭제 완료 */}
    </Obj>
  </Canvas>
);

// 2. 캠퍼스 라이프 씬 - 두 번째 플로팅 카드를 수강신청 페이지 디자인으로 변경
const VisualCampusLife = ({ p }: { p: Palette }) => (
  <Canvas>
    {/* 메인 캘린더 / 시간표 보드 */}
    <Obj>
      <rect x="60" y="70" width="220" height="260" rx="20" fill={p.paper} />
      <rect
        x="85"
        y="95"
        width="70"
        height="12"
        rx="6"
        fill={INK}
        fillOpacity={0.15}
        stroke="none"
      />

      {/* 스케줄 블록들 */}
      <g stroke="none">
        <rect x="85" y="135" width="40" height="60" rx="8" fill={p.bg} />
        <rect x="135" y="135" width="40" height="90" rx="8" fill={p.point} />
        <rect x="185" y="135" width="40" height="40" rx="8" fill={p.b} />
        <rect x="85" y="205" width="40" height="90" rx="8" fill={p.b} />
        <rect x="185" y="185" width="40" height="70" rx="8" fill={p.bg} />
      </g>
    </Obj>

    {/* 플로팅 카드 1 (동아리/할일 느낌 유지) */}
    <Obj delay={0.15}>
      <rect
        x="180"
        y="244"
        width="160"
        height="70"
        rx="16"
        fill={INK}
        fillOpacity={0.05}
        stroke="none"
      />
      <rect x="180" y="240" width="160" height="70" rx="16" fill={p.paper} />
      <circle cx="215" cy="275" r="14" fill={p.bg} stroke="none" />
      <rect
        x="245"
        y="265"
        width="70"
        height="8"
        rx="4"
        fill={INK}
        fillOpacity={0.15}
        stroke="none"
      />
      <rect
        x="245"
        y="280"
        width="40"
        height="6"
        rx="3"
        fill={INK}
        fillOpacity={0.08}
        stroke="none"
      />
    </Obj>

    {/* 수강신청 창 느낌으로 변경된 플로팅 카드 2 (가로가 더 긴 UI) */}
    <Obj delay={0.25}>
      <rect
        x="100"
        y="324"
        width="240"
        height="80"
        rx="12"
        fill={INK}
        fillOpacity={0.05}
        stroke="none"
      />
      <rect x="100" y="320" width="240" height="80" rx="12" fill={p.paper} />

      {/* 헤더 바 영역 */}
      <path
        d="M 100 332 Q 100 320 112 320 L 328 320 Q 340 320 340 332 L 340 340 L 100 340 Z"
        fill={p.bg}
        stroke="none"
      />
      <circle
        cx="115"
        cy="330"
        r="3"
        fill={INK}
        fillOpacity={0.2}
        stroke="none"
      />
      <circle
        cx="125"
        cy="330"
        r="3"
        fill={INK}
        fillOpacity={0.2}
        stroke="none"
      />
      <circle
        cx="135"
        cy="330"
        r="3"
        fill={INK}
        fillOpacity={0.2}
        stroke="none"
      />

      {/* 리스트 아이템 1 */}
      <rect
        x="110"
        y="350"
        width="12"
        height="12"
        rx="3"
        fill="none"
        stroke={INK}
        strokeOpacity={0.3}
        strokeWidth={1.5}
      />
      <rect
        x="135"
        y="352"
        width="120"
        height="8"
        rx="4"
        fill={INK}
        fillOpacity={0.15}
        stroke="none"
      />
      <rect
        x="270"
        y="350"
        width="50"
        height="12"
        rx="6"
        fill={p.point}
        stroke="none"
      />

      {/* 리스트 아이템 2 */}
      <rect
        x="110"
        y="375"
        width="12"
        height="12"
        rx="3"
        fill={p.point}
        stroke="none"
      />
      <path
        d="M 113 381 L 115 383 L 119 378"
        fill="none"
        stroke={p.paper}
        strokeWidth={2}
      />
      <rect
        x="135"
        y="377"
        width="90"
        height="8"
        rx="4"
        fill={INK}
        fillOpacity={0.15}
        stroke="none"
      />
      <rect
        x="270"
        y="375"
        width="50"
        height="12"
        rx="6"
        fill={p.b}
        stroke="none"
      />
    </Obj>
  </Canvas>
);

// 3. 채팅 씬 - 채팅창 세로 높이 증가 (360 -> 400)
const VisualSpeaking = ({ p }: { p: Palette }) => (
  <Canvas>
    <Obj>
      {/* 높이를 400으로 늘려 입력창이 안으로 들어오도록 수정 */}
      <rect x="40" y="30" width="320" height="400" rx="24" fill={p.paper} />

      {/* 헤더 바 */}
      <rect x="60" y="50" width="280" height="46" rx="14" fill={p.b} />
      <circle cx="90" cy="73" r="12" fill={p.paper} stroke="none" />
      <text
        x="115"
        y="78"
        fill={INK}
        fontSize="14"
        fontWeight={800}
        stroke="none"
      >
        IEUM Chat
      </text>
    </Obj>

    {/* 말풍선들의 Y위치는 동일(또는 살짝 조정)하게 유지 */}
    <Obj delay={0.1}>
      <rect x="60" y="120" width="150" height="42" rx="16" fill={p.bg} />
      <text
        x="80"
        y="146"
        fill={INK}
        fontSize="14"
        fontWeight={700}
        stroke="none"
      >
        안녕하세요! 👋
      </text>

      <rect x="60" y="240" width="164" height="42" rx="16" fill={p.bg} />
      <text
        x="80"
        y="266"
        fill={INK}
        fontSize="14"
        fontWeight={700}
        stroke="none"
      >
        수업 어때요?
      </text>
    </Obj>

    <Obj delay={0.18}>
      <rect x="190" y="180" width="150" height="42" rx="16" fill={p.point} />
      <text
        x="210"
        y="206"
        fill={p.paper}
        fontSize="14"
        fontWeight={700}
        stroke="none"
      >
        はじめまして！
      </text>

      <rect x="190" y="300" width="150" height="42" rx="16" fill={p.point} />
      <text
        x="210"
        y="326"
        fill={p.paper}
        fontSize="14"
        fontWeight={700}
        stroke="none"
      >
        とても楽しい！
      </text>
    </Obj>

    <Obj delay={0.26}>
      {/* 채팅창 내부에 쏙 들어오는 입력창 */}
      <rect
        x="60"
        y="370"
        width="220"
        height="40"
        rx="20"
        fill={p.bg}
        fillOpacity={0.5}
        stroke="none"
      />

      {/* 보내기 버튼 (2시 방향 유지) */}
      <circle cx="320" cy="390" r="20" fill={p.point} stroke="none" />
      <path
        d="M313 397 L325 385 M325 385 L316 385 M325 385 L325 394"
        stroke={p.paper}
        strokeWidth={2.5}
        fill="none"
      />
    </Obj>
  </Canvas>
);

// 4. 서포트 씬 - 화살표 대신 비행기(Airplane) 그래픽 적용
const VisualSupport = ({ p }: { p: Palette }) => (
  <Canvas>
    {/* 아름다운 점선 연결 경로 */}
    <Obj>
      <path
        d="M 100 300 C 140 160, 240 120, 300 150"
        fill="none"
        stroke={INK}
        strokeOpacity={0.2}
        strokeWidth={2.5}
        strokeDasharray="6 6"
      />
    </Obj>

    {/* 일본 (TOKYO) 깔끔한 마커 */}
    <Obj delay={0.08}>
      <circle cx="100" cy="300" r="18" fill={p.b} stroke="none" />
      <circle
        cx="100"
        cy="300"
        r="6"
        fill={p.point}
        stroke={p.paper}
        strokeWidth={2.5}
      />
      <rect x="60" y="330" width="80" height="32" rx="16" fill={p.paper} />
      <text
        x="100"
        y="351"
        fill={INK}
        fontSize="13"
        fontWeight={800}
        textAnchor="middle"
        stroke="none"
      >
        TOKYO
      </text>
    </Obj>

    {/* 한국 (SEOUL) 깔끔한 마커 */}
    <Obj delay={0.16}>
      <circle cx="300" cy="150" r="18" fill={p.b} stroke="none" />
      <circle
        cx="300"
        cy="150"
        r="6"
        fill={p.point}
        stroke={p.paper}
        strokeWidth={2.5}
      />
      <rect x="260" y="180" width="80" height="32" rx="16" fill={p.paper} />
      <text
        x="300"
        y="201"
        fill={INK}
        fontSize="13"
        fontWeight={800}
        textAnchor="middle"
        stroke="none"
      >
        SEOUL
      </text>
    </Obj>

    {/* 화살표 대신 비행기 그래픽(Airplane Path) 적용 */}
    <Obj delay={0.24}>
      <g transform="translate(195, 195) rotate(-35)">
        {/* 비행기 몸통 & 날개 */}
        <path
          d="M 15 0 C 18 -2, 18 2, 15 0 L 0 -4 L -10 -15 L -12 -15 L -6 -4 L -15 -4 L -18 -8 L -20 -8 L -18 0 L -20 8 L -18 8 L -15 4 L -6 4 L -12 15 L -10 15 L 0 4 Z"
          fill={p.point}
          stroke="none"
        />
        {/* 비행기 궤적 이펙트 */}
        <path
          d="M -22 0 L -35 0"
          stroke={p.point}
          strokeWidth={2}
          strokeOpacity={0.5}
          strokeDasharray="3 3"
          fill="none"
        />
      </g>
    </Obj>
  </Canvas>
);

const VISUALS = [VisualMatch, VisualCampusLife, VisualSpeaking, VisualSupport];

const FeatureVisual = memo(({ index }: { index: number }) => {
  const Visual = VISUALS[index];
  const p = PALETTES[index];
  return (
    <div className="h-full w-full px-6 py-8" style={{ backgroundColor: p.bg }}>
      <Visual p={p} />
    </div>
  );
});
FeatureVisual.displayName = "FeatureVisual";

export const FeaturesSection = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feature = featuresData[currentIndex];
  const p = PALETTES[currentIndex];

  return (
    <section id="features" className="py-24 bg-slate-50 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e2640] tracking-tight">
            IEUMの特徴
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(14,38,64,0.08)]">
            <div className="flex min-h-125 flex-col md:flex-row">
              <div className="relative min-h-95 border-b border-[#16324F]/6 md:min-h-125 md:w-1/2 md:border-b-0 md:border-r">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <FeatureVisual index={currentIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-center p-8 md:w-1/2 md:px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span
                      className="mb-4 inline-block rounded-lg px-3.5 py-1.5 text-xs font-bold text-[#16324F]"
                      style={{ backgroundColor: p.badge }}
                    >
                      {feature.label}
                    </span>

                    <h3 className="mb-5 whitespace-pre-line text-2xl font-black leading-[1.35] text-[#16324F] md:text-[27px]">
                      {feature.title}
                    </h3>

                    <div className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                      {feature.description}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-10">
            {featuresData.map((f, idx) => (
              <button
                key={f.label}
                onClick={() => setCurrentIndex(idx)}
                aria-label={f.label}
                aria-current={currentIndex === idx}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: currentIndex === idx ? 48 : 24,
                  backgroundColor:
                    currentIndex === idx
                      ? PALETTES[idx].point
                      : "rgba(22,50,79,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
FeaturesSection.displayName = "FeaturesSection";
