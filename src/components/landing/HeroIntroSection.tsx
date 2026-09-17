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
    <div className="flex flex-col w-full">
      <HeroBannerSection ctaButton={ctaButton} />
      <AboutSection />
      <FeaturesSection />
      <LessonFlowSection />
      <TutorShowcaseSection />
      <FooterSection />
    </div>
  );
}
