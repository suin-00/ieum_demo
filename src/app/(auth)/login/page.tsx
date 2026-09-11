import { LogIn } from "@/components/auth/LogInForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-end pr-12 lg:pr-20">
      {/* 배경 일러스트 이미지 */}
      <Image
        src="/images/background.png"
        alt="IEUM Background"
        fill
        className="object-cover -z-10"
        priority
      />
      {/* 💡 크기를 대폭 키운 유리 카드 폼 (max-w-xl, p-12) */}
      <div className="w-[90%] sm:w-[460px] lg:w-[28vw] max-w-lg min-w-[380px] rounded-3xl bg-white/50 backdrop-blur-md px-12 py-14 lg:py-20 shadow-2xl border border-white/40 flex flex-col justify-center">
        {" "}
        <LogIn />
      </div>
    </main>
  );
}
