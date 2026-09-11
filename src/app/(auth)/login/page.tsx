import { LogIn } from "@/components/auth/LogInForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4">
      {/* 배경 일러스트 이미지 */}
      <Image
        src="/images/background.png"
        alt="IEUM Background"
        fill
        className="object-cover -z-10"
        priority
      />
      {/* 💡 크기를 대폭 키운 유리 카드 폼 (max-w-xl, p-12) */}
      <div className="w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur-md p-12 shadow-2xl border border-white/40">
        <LogIn />
      </div>
    </main>
  );
}
