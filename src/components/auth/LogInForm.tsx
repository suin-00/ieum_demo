"use client";

import React, { useState, useActionState } from "react";
import Link from "next/link";
import { loginWithEmail } from "@/actions/auth";
import Image from "next/image";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginWithEmail, null);
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setClientError(null);

    // 로그인 폼에서도 필수 입력값 빠진 게 있는지 클라이언트에서 먼저 체크
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      e.preventDefault();
      setClientError("未入力の項目があります。"); // "입력되지 않은 항목이 있습니다."
      return;
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white">
      {/* Left Image Column */}
      <div className="hidden lg:block w-full h-screen relative top-0 overflow-hidden bg-[#0E2640]">
        <Image
          src="/images/background.png"
          alt="IEUM Authentication"
          fill
          sizes="50vw"
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Right Form Column */}
      <div className="flex flex-col items-center justify-center px-6 sm:px-12 py-12 lg:py-16 w-full min-h-screen overflow-y-auto bg-white">
        <div className="w-full max-w-md relative my-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0E2640] mb-2 tracking-tight">
              ログイン
            </h2>
            <p className="text-sm text-[#0E2640]/60 font-medium">
              IEUMへようこそ。
            </p>
          </div>

          {/* 👇 회원가입 폼과 똑같은 빨간색 박스 레이아웃 적용 */}
          {(clientError || state?.error) && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold text-center">
              {clientError || state?.error}
            </div>
          )}

          <form
            action={formAction}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@ieum.com"
                className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                パスワード
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
              <div className="mt-2.5 text-right">
                <Link
                  href="/reset-password"
                  className="text-xs font-bold text-[#0E2640]/60 hover:text-[#0E2640] transition-colors"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#0E2640] hover:bg-[#16385e] text-[#F0DDBD] py-4 rounded-lg text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isPending ? "ログイン中..." : "ログイン"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-medium text-[#0E2640]/60">
            アカウントをお持ちではないですか？{" "}
            <Link
              href="/signup"
              className="text-[#0E2640] font-bold hover:underline cursor-pointer ml-1"
            >
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
