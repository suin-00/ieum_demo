"use client";

import { useActionState } from "react";
import { loginWithEmail } from "@/actions/auth";
import Link from "next/link";

// ❌ onToggle prop 인터페이스 통째로 제거
export function LogIn() {
  const [state, formAction, isPending] = useActionState(loginWithEmail, null);

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-[#1E293B] mb-2">
          ログイン
        </h2>
        <p className="text-sm text-slate-500 font-medium">IEUMへようこそ。</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@ieum.com"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
          <div className="mt-2 text-right">
            <Link
              href="/reset-password"
              className="text-sm text-slate-500 hover:text-[#235499] transition-colors"
            >
              パスワードをお忘れですか？
            </Link>
          </div>
        </div>

        {state?.error && (
          <p className="text-red-500 text-xs font-medium text-center">
            {state.error}
          </p>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#235499] hover:bg-[#1e4a87] text-white py-3.5 rounded-lg text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 disabled:bg-slate-300"
          >
            {isPending ? "로그인 중..." : "ログイン"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs font-medium text-slate-500">
        アカウントをお持ちではないですか？{" "}
        {/* ❌ onToggle 함수 대신 Next.js Link로 페이지 이동 처리 */}
        <Link
          href="/signup"
          className="text-[#235499] font-bold hover:underline hover:text-[#1e4a87]"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}
