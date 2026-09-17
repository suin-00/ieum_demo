import { Navbar } from "@/components/common/Navbar";
import HeroIntroSection from "@/components/landing/HeroIntroSection";
import { SignupCtaButton } from "@/components/landing/SignupCtaButton";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased relative">
      <Navbar />

      <HeroIntroSection ctaButton={<SignupCtaButton />} />
    </div>
  );
}
