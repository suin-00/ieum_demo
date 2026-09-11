"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import {
  signupWithEmail,
  checkEmailDuplicate,
  SignupState,
} from "@/actions/auth";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState<SignupState, FormData>(
    signupWithEmail,
    null,
  );

  // 💡 이메일 중복 확인 상태 관리 추가
  const [email, setEmail] = useState("");
  const [emailCheckMessage, setEmailCheckMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // 💡 중복 확인 버튼 클릭 핸들러
  const handleCheckDuplicate = async () => {
    if (!email || !email.includes("@")) {
      setEmailCheckMessage({
        text: "有効なメールアドレスを入力してください。",
        isError: true,
      });
      return;
    }

    try {
      setIsCheckingEmail(true);
      setEmailCheckMessage(null);
      const isDuplicate = await checkEmailDuplicate(email);

      if (isDuplicate) {
        setEmailCheckMessage({
          text: "すでに使用中のメールアドレスです。",
          isError: true,
        });
      } else {
        setEmailCheckMessage({
          text: "使用可能なメールアドレスです。",
          isError: false,
        });
      }
    } catch {
      setEmailCheckMessage({
        text: "確認中にエラーが発生しました。",
        isError: true,
      });
    } finally {
      setIsCheckingEmail(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold text-[#1E293B] mb-2">
          新規登録
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          IEUMと一緒に韓国留学の準備を始めましょう。
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {/* Name Fields (Horizontal Layout) */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              姓
            </label>
            <input
              type="text"
              name="last_name"
              required
              placeholder="山田"
              className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              名
            </label>
            <input
              type="text"
              name="first_name"
              required
              placeholder="太郎"
              className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Furigana */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              姓 (フリガナ)
            </label>
            <input
              type="text"
              name="last_name_kana"
              placeholder="ヤマダ"
              className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              名 (フリガナ)
            </label>
            <input
              type="text"
              name="first_name_kana"
              placeholder="タロウ"
              className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Desired School */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            志望校
          </label>
          <input
            type="text"
            name="school"
            required
            placeholder="例：ソウル大学"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            性別
          </label>
          <input type="hidden" name="gender" defaultValue="female" />
          <div className="flex gap-2">
            {[
              { id: "male", label: "男性" },
              { id: "female", label: "女性" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={(e) => {
                  const form = e.currentTarget.form;
                  if (form) {
                    const input = form.elements.namedItem(
                      "gender",
                    ) as HTMLInputElement;
                    if (input) input.value = option.id;
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all bg-[#FCFAFA] border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 focus:bg-[#eef3fa] focus:border-[#235499] focus:text-[#235499]`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Korean Proficiency Level */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            韓国語レベル
          </label>
          <input type="hidden" name="korean_level" defaultValue="beginner" />
          <div className="flex gap-2">
            {[
              { id: "beginner", label: "初級" },
              { id: "intermediate", label: "中級" },
              { id: "advanced", label: "上級" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={(e) => {
                  const form = e.currentTarget.form;
                  if (form) {
                    const input = form.elements.namedItem(
                      "korean_level",
                    ) as HTMLInputElement;
                    if (input) input.value = option.id;
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all bg-[#FCFAFA] border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 focus:bg-[#eef3fa] focus:border-[#235499] focus:text-[#235499]`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            メールアドレス
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@ieum.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
            <button
              type="button"
              onClick={handleCheckDuplicate}
              disabled={isCheckingEmail}
              className="shrink-0 px-4 py-2.5 bg-slate-100 text-[#405B78] hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors border border-slate-200 whitespace-nowrap disabled:bg-slate-200"
            >
              {isCheckingEmail ? "확인중..." : "重複確認"}
            </button>
          </div>
          {/* 중복 확인 결과 메시지 */}
          {emailCheckMessage && (
            <p
              className={`mt-1 text-xs font-medium ${emailCheckMessage.isError ? "text-red-500" : "text-green-600"}`}
            >
              {emailCheckMessage.text}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            パスワード確認
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        {state?.error && (
          <p className="text-red-500 text-xs font-medium text-center">
            {state.error}
          </p>
        )}

        {state?.success && (
          <p className="text-green-600 text-xs font-medium text-center">
            会員登録が完了しました！ログインしてください。
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#235499] hover:bg-[#1e4a87] text-white py-3 rounded-lg text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 disabled:bg-slate-300"
          >
            {isPending ? "登録中..." : "新規登録"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs font-medium text-slate-500">
        すでにアカウントをお持ちですか？{" "}
        <Link
          href="/login"
          className="text-[#235499] font-bold hover:underline hover:text-[#1e4a87]"
        >
          ログイン
        </Link>
      </div>
    </div>
  );
}
