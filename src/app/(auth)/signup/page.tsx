import { SignUpForm } from "@/components/auth/SignUpForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-end pr-12 lg:pr-20 py-10">
      {/* 배경 일러스트 이미지 */}
      <Image
        src="/images/background.png"
        alt="IEUM Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* 32인치와 노트북 모두에서 비율이 깨지지 않는 동적 반응형 유리 카드 */}
      <div className="w-[90%] sm:w-[480px] lg:w-[32vw] max-w-xl min-w-[380px] rounded-3xl bg-white/50 backdrop-blur-md px-10 py-10 lg:py-14 shadow-2xl border border-white/40 flex flex-col justify-center">
        <SignUpForm />
      </div>
    </main>
  );
}
