"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function SignupCtaButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/signup")}
      className="bg-[#0e2640] hover:bg-[#122e4d] hover:opacity-90 text-[#F5EBBC] px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-md shadow-[#0e2640]/25 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
    >
      つなげる
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
