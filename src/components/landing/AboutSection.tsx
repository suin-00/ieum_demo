"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

// 모든 줄이 동시에 시작하도록 딜레이를 통일한 타이핑 컴포넌트
function TypewriterFadeParagraph({
  text,
  delay = 0.1,
}: {
  text: string;
  delay?: number;
}) {
  const letters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.12,
            // 모든 줄이 동일한 base delay를 공유하므로, 화면에 들어오는 순간 모든 줄이 동시다발적으로 타이핑됩니다.
            delay: delay + index * 0.015,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="flex flex-col">
      {/* IEUM이 해결하는 문제 */}
      <div className="bg-slate-50 pt-20 pb-28 lg:pt-28 lg:pb-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0E2640] leading-tight tracking-tight mb-6">
                韓国留学の「分からない」を、
                <br className="hidden sm:inline" />
                現地の大学生の先輩と一緒に
                <br className="hidden lg:inline" />
                減らしていく。
              </h2>

              {/* 👇 모든 줄의 delay를 동일하게(0.15) 주어 동시에 타이핑 시작 */}
              <p className="text-[#61799C] text-base sm:text-lg font-normal leading-[29.25px] max-w-2xl">
                <span className="block">
                  <TypewriterFadeParagraph
                    text="韓国留学を準備していると、韓国語だけでなく、"
                    delay={0.15}
                  />
                </span>
                <span className="block sm:inline">
                  <TypewriterFadeParagraph
                    text="新しい環境への不安や大学生活について"
                    delay={0.15}
                  />
                </span>
                <span className="block sm:inline">
                  <TypewriterFadeParagraph
                    text="分からないことがたくさんあります。"
                    delay={0.15}
                  />
                </span>
                <span className="block sm:inline">
                  <TypewriterFadeParagraph
                    text="IEUMは、韓国の現地大学に通う大学生とつながりながら、"
                    delay={0.15}
                  />
                </span>
                <span className="block sm:inline">
                  <TypewriterFadeParagraph
                    text="そんな不安を一緒に少しずつ解消していくサービスです。"
                    delay={0.15}
                  />
                </span>
              </p>
            </div>

            <div className="lg:col-span-3 relative w-full mt-8 lg:mt-0">
              {/* 👇 motion.div를 적용하여 아래에서 위로 뽀잉- 하고 튀어 오르게 설정 */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 300, // 숫자가 높을수록 탄성이 강해짐
                  damping: 15, // 숫자가 낮을수록 더 많이 꿀렁거리며 튕김 (뽀잉 느낌 핵심!)
                  mass: 0.8,
                  delay: 0.2,
                }}
                className="w-full relative overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  width="1478"
                  height="1064"
                  alt="IEUM service"
                  src="/images/landing1.png"
                  className="object-cover w-full h-auto max-h-115 lg:max-h-130 rounded-2xl block"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* IEUM의 역할 */}
      <div className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            width="1448"
            height="1086"
            alt="IEUM Background"
            src="/images/bkg.png"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#0E2640]/80"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
          <h3 className="text-2xl sm:text-3xl lg:text-[45px] font-bold not-italic text-white mb-8 tracking-tight leading-snug">
            私たちは、一方的に韓国語を教える
            <br className="hidden sm:inline" />
            チューターではありません。
          </h3>

          <p className="text-[#F0DDBD] text-lg sm:text-xl leading-relaxed sm:leading-loose mb-8 max-w-3xl mx-auto">
            同じキャンパスや大学生活を一足先に経験した先輩として、
            <br className="hidden sm:inline" />
            履修登録、寮生活、サークル、友人関係、グループワーク、大学文化など、
            <br className="hidden sm:inline" />
            <span className="relative inline-block mx-1 px-2 py-0.5 rounded-sm bg-[#F6E374] text-[#0E2640] font-bold shadow-xs">
              リアルな韓国の大学生活
            </span>
            を共有します。
          </p>

          <p className="text-[#F0DDBD] text-lg sm:text-xl leading-relaxed sm:leading-loose mb-10 max-w-3xl mx-auto">
            韓国の大学生なら自然と知っているけれど、留学生にはなかなか分からないこと。
            <br className="hidden sm:inline" />
            そんな教科書や検索だけでは分からない情報を、現地の大学生から直接知ることで、
            <br className="hidden sm:inline" />
            韓国留学をもっと安心して、もっと楽しみに準備できるようにする。
          </p>

          <p className="text-white text-lg sm:text-xl font-extrabold tracking-wide">
            それがIEUMです。
          </p>
        </div>
      </div>
    </section>
  );
}
