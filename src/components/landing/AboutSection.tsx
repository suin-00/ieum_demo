import React from "react";
import Image from "next/image";

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

              <p className="text-[#61799C] text-base sm:text-lg font-normal leading-[29.25px] max-w-2xl">
                韓国留学を準備していると、韓国語だけでなく、
                <br className="hidden sm:inline" />
                新しい環境への不安や大学生活について
                <br className="hidden sm:inline" />
                分からないことがたくさんあります。
                <br className="hidden sm:inline" />
                IEUMは、韓国の現地大学に通う大学生とつながりながら、
                <br className="hidden sm:inline" />
                そんな不安を一緒に少しずつ解消していくサービスです。
              </p>
            </div>

            <div className="lg:col-span-3 relative w-full mt-8 lg:mt-0">
              <div className="w-full relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  width="1478"
                  height="1064"
                  alt="IEUM service"
                  src="/images/landing1.png"
                  className="object-cover w-full h-auto max-h-[460px] lg:max-h-[520px] rounded-2xl block"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
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
            src="/images/bgk.png"
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
