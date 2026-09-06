"use client";

import Link from "next/link";
import { useState } from "react";

type Language = "ko" | "ja";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("ja");
  const isKorean = language === "ko";

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#0E2640]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-[0.18em]">
            IEUM
          </Link>
          <div
            className="flex items-center rounded-lg border border-[#0E2640]/15 bg-white/60 p-1"
            aria-label="언어 선택"
          >
            <button
              type="button"
              onClick={() => setLanguage("ko")}
              aria-pressed={isKorean}
              className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                isKorean
                  ? "bg-[#0E2640] text-white"
                  : "text-slate-500 hover:text-[#0E2640]"
              }`}
            >
              KR
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ja")}
              aria-pressed={!isKorean}
              className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                !isKorean
                  ? "bg-[#0E2640] text-white"
                  : "text-slate-500 hover:text-[#0E2640]"
              }`}
            >
              JP
            </button>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-3xl text-center">
            <p className="mb-5 text-sm font-bold tracking-[0.24em] text-[#9b7653]">
              KOREA STUDY CONNECTION
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              {isKorean ? "IEUM이란" : "IEUMとは"}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
              {isKorean
                ? "한국 유학의 ‘모르는 것’을 현지 대학생 선배와 함께 줄여갑니다."
                : "韓国留学の「分からない」を、現地の大学生の先輩と一緒に減らしていく。"}
            </p>
            <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base">
              {isKorean
                ? `한국 유학을 준비하다 보면 한국어뿐만 아니라,
새로운 환경에 대한 불안과 대학생활에 대해 모르는 것이 많습니다.

IEUM은 한국 현지 대학에 다니는 대학생과 연결되어,
그런 불안을 함께 조금씩 해결해가는 서비스입니다.`
                : `韓国留学を準備していると、韓国語だけでなく、
新しい環境への不安や大学生活について分からないことがたくさんあります。

IEUMは、韓国の現地大学に通う大学生とつながりながら、
そんな不安を一緒に少しずつ解消していくサービスです。`}
            </p>

            <Link
              href="/signup"
              className="mx-auto mt-10 flex w-fit items-center justify-center rounded-2xl bg-[#0E2640] px-12 py-4 text-base font-bold text-white shadow-lg shadow-[#0E2640]/15 transition-transform hover:-translate-y-1 hover:bg-slate-900"
            >
              {isKorean ? "연결하기" : "つながる"}
            </Link>
          </div>
        </div>

        <section className="border-t border-[#0E2640]/10 pt-8">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-slate-600 sm:text-base">
            {isKorean
              ? "우리는 일방적으로 한국어를 가르치는 튜터가 아닙니다. 같은 캠퍼스와 대학생활을 먼저 경험한 선배로서 수강신청, 기숙사 생활, 동아리, 친구 관계, 그룹 과제와 대학 문화를 공유합니다."
              : "私たちは、一方的に韓国語を教えるチューターではありません。同じキャンパスや大学生活を一足先に経験した先輩として、履修登録、寮生活、サークル、友人関係、グループワーク、大学文化など、リアルな韓国の大学生活を共有します。"}
          </p>
          <p className="mt-5 text-center text-sm font-semibold leading-7 text-[#0E2640] sm:text-base">
            {isKorean
              ? "교과서나 검색만으로는 알기 어려운 정보를 현지 대학생에게 직접 들으며, 한국 유학을 더 안심하고 더 기대하며 준비할 수 있도록 합니다."
              : "教科書や検索だけでは分からない情報を、現地の大学生から直接知ることで、韓国留学をもっと安心して、もっと楽しみに準備できるようにする。"}
          </p>
        </section>
      </section>
    </main>
  );
}
