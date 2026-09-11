"use client";

import React, { useState } from "react";
import Link from "next/link";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    furigana: "",
    school: "",
    gender: "female",
    proficiency: "beginner",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleProficiencySelect = (level: string) => {
    setFormData((prev) => ({ ...prev, proficiency: level }));
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

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Name Fields (Horizontal Layout) */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              姓
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="太郎"
              className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Furigana */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            フリガナ
          </label>
          <input
            type="text"
            name="furigana"
            value={formData.furigana}
            onChange={handleChange}
            placeholder="ヤマダ タロウ"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        {/* Desired School */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            志望校
          </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="例：ソウル大学"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            性別
          </label>
          <div className="flex gap-2">
            {[
              { id: "male", label: "男性" },
              { id: "female", label: "女性" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleGenderSelect(option.id)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  formData.gender === option.id
                    ? "bg-[#eef3fa] border-[#235499] text-[#235499] shadow-sm"
                    : "bg-[#FCFAFA] border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                }`}
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
          <div className="flex gap-2">
            {[
              { id: "beginner", label: "初級" },
              { id: "intermediate", label: "中級" },
              { id: "advanced", label: "上級" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleProficiencySelect(option.id)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  formData.proficiency === option.id
                    ? "bg-[#eef3fa] border-[#235499] text-[#235499] shadow-sm"
                    : "bg-[#FCFAFA] border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                }`}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="example@ieum.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
            />
            <button
              type="button"
              className="shrink-0 px-4 py-2.5 bg-slate-100 text-[#405B78] hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
            >
              重複確認
            </button>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg bg-[#FCFAFA] border border-slate-200 text-[#1E293B] text-sm focus:bg-white focus:border-[#235499] focus:ring-2 focus:ring-[#235499]/20 outline-none transition-all placeholder-slate-400 font-medium"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#235499] hover:bg-[#1e4a87] text-white py-3 rounded-lg text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            新規登録
          </button>
        </div>
      </form>

      {/* button + onToggle 대신 Link로 /login 이동 */}
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
