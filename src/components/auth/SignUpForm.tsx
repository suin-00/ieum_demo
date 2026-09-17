"use client";

import React, { useState, useActionState } from "react";
import Link from "next/link";
import { signupWithEmail, checkEmailDuplicate } from "@/actions/auth";
import Image from "next/image";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signupWithEmail, null);
  const [clientError, setClientError] = useState<string | null>(null); // 👈 클라이언트 에러 메시지용 state 추가

  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    last_name_kana: "",
    first_name_kana: "",
    school: "",
    gender: "female",
    korean_level: "beginner",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setIsEmailVerified(false);
      setEmailCheckMessage(null);
    }
  };

  const handleCheckDuplicate = async () => {
    if (!formData.email || !formData.email.includes("@")) {
      setEmailCheckMessage({
        text: "有効なメールアドレスを入力してください。",
        isError: true,
      });
      return;
    }

    try {
      setIsCheckingEmail(true);
      setEmailCheckMessage(null);

      const isDuplicate = await checkEmailDuplicate(formData.email);

      if (isDuplicate) {
        setIsEmailVerified(false);
        setEmailCheckMessage({
          text: "すでに使用中のメールアドレスです。",
          isError: true,
        });
      } else {
        setIsEmailVerified(true);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setClientError(null); // 제출 시 기존 에러 초기화

    // 비밀번호 불일치 시 alert 대신 빨간 박스 에러 띄우기
    if (formData.password !== formData.confirmPassword) {
      e.preventDefault();
      setClientError("パスワードが一致しません。");
      return;
    }

    if (
      !formData.last_name.trim() ||
      !formData.first_name.trim() ||
      !formData.last_name_kana.trim() ||
      !formData.first_name_kana.trim() ||
      !formData.school.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      e.preventDefault();
      setClientError("未入力の項目があります。"); // "입력되지 않은 항목이 있습니다."
      return;
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white">
      {/* Left Image Column */}
      <div className="hidden lg:block w-full h-screen sticky top-0 overflow-hidden bg-[#0E2640]">
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
              新規登録
            </h2>
            <p className="text-sm text-[#0E2640]/60 font-medium">
              IEUMと一緒に韓国留学の準備を始めましょう。
            </p>
          </div>

          {/* 👇 타이틀 바로 아래에 뜨는 통일된 에러 및 성공 박스 레이아웃 */}
          {(clientError || state?.error) && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold text-center">
              {clientError || state?.error}
            </div>
          )}

          {state?.success && (
            <div className="mb-6 p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-bold text-center">
              登録が完了しました！ログインしてください。
            </div>
          )}

          <form
            action={formAction}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name Fields */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                  姓
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="山田"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                  名
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="太郎"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Kana Fields */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                  姓(フリガナ)
                </label>
                <input
                  type="text"
                  name="last_name_kana"
                  value={formData.last_name_kana}
                  onChange={handleChange}
                  placeholder="ヤマダ"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                  名(フリガナ)
                </label>
                <input
                  type="text"
                  name="first_name_kana"
                  value={formData.first_name_kana}
                  onChange={handleChange}
                  placeholder="タロウ"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* School */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                志望校
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="例：ソウル大学"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                性別
              </label>
              <input type="hidden" name="gender" value={formData.gender} />
              <div className="flex gap-2">
                {[
                  { id: "male", label: "男性" },
                  { id: "female", label: "女性" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, gender: option.id }))
                    }
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      formData.gender === option.id
                        ? "bg-[#0E2640] border-[#0E2640] text-[#F0DDBD] shadow-sm"
                        : "bg-slate-50 border-slate-200 text-[#0E2640]/60 hover:bg-slate-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Korean Proficiency */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                韓国語レベル
              </label>
              <input
                type="hidden"
                name="korean_level"
                value={formData.korean_level}
              />
              <div className="flex gap-2">
                {[
                  { id: "beginner", label: "初級" },
                  { id: "intermediate", label: "中級" },
                  { id: "advanced", label: "上級" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        korean_level: option.id,
                      }))
                    }
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      formData.korean_level === option.id
                        ? "bg-[#0E2640] border-[#0E2640] text-[#F0DDBD] shadow-sm"
                        : "bg-slate-50 border-slate-200 text-[#0E2640]/60 hover:bg-slate-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                メールアドレス
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@ieum.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={handleCheckDuplicate}
                  disabled={isCheckingEmail}
                  className={`shrink-0 px-4 py-3 text-xs font-bold rounded-lg transition-colors border whitespace-nowrap disabled:opacity-50 ${
                    isEmailVerified
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" // 👈 인증 완료 시 초록색 스타일
                      : "bg-[#0E2640]/5 text-[#0E2640] hover:bg-[#0E2640]/10 border-[#0E2640]/10" // 👈 평소 스타일
                  }`}
                >
                  {isCheckingEmail ? "確認中..." : "重複確認"}
                </button>
              </div>
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
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                パスワード
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">
                パスワード確認
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#0E2640] hover:bg-[#16385e] text-[#F0DDBD] py-4 rounded-lg text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isPending ? "登録中..." : "新規登録"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-medium text-[#0E2640]/60">
            すでにアカウントをお持ちですか？{" "}
            <Link
              href="/login"
              className="text-[#0E2640] font-bold hover:underline cursor-pointer ml-1"
            >
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
