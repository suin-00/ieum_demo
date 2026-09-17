import React from "react";
import { HeroBannerSection } from "./HeroBannerSection";
import { AboutSection } from "./AboutSection";
import { FeaturesSection } from "./FeaturesSection";
import LessonFlowSection from "./LessonFlowSection";
import { TutorShowcaseSection } from "./TutorShowcaseSection";
import { FooterSection } from "./FooterSection";

export interface HeroIntroSectionProps {
  ctaButton?: React.ReactNode;
}

export default function HeroIntroSection({ ctaButton }: HeroIntroSectionProps) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 
        - 기본/14인치 구간: scale-95로 너무 크지 않게 적당히 밀착
        - lg(15인치 이상 모니터): scale-105로 시원하게 확대
        - xl(울트라와이드/대형 모니터): scale-110으로 꽉 찬 느낌 부여
      */}
      <div className="w-full transform origin-top scale-95 lg:scale-105 xl:scale-110 transition-transform">
        <HeroBannerSection ctaButton={ctaButton} />
        <AboutSection />
        <FeaturesSection />
        <LessonFlowSection />
        <TutorShowcaseSection />
        <FooterSection />
      </div>
    </div>
  );
}
