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
    // w-full을 유지하면서 큰 화면에서 전체적인 스케일감이나 여백을 키워줍니다.
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 
        만약 컴포넌트 전체를 통째로 큼직하게 키우고 싶다면 아래처럼 
        내부 컨테이너에 scale이나 폰트/간격 확장 클래스를 조합할 수 있습니다.
        예: 대형 모니터(lg 이상)에서 전체적인 비율이 시원하게 커지도록 설정
      */}
      <div className="w-full transform origin-top lg:scale-105 xl:scale-110 transition-transform">
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
