'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    furiganaLast: '',
    furiganaFirst: '',
    school: '',
    gender: 'female',
    proficiency: 'beginner',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white">
      {/* Left Image Column */}
      <div className="hidden lg:block relative w-full h-screen sticky top-0 overflow-hidden bg-[#0E2640]">
        <img 
          src="https://github.com/user-attachments/assets/1b279dd3-bdff-419e-8f78-75ddfa036e21" 
          alt="IEUM Authentication" 
          className="w-full h-full object-cover opacity-90"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Right Form Column */}
      <div className="flex flex-col items-center justify-center px-6 sm:px-12 py-12 lg:py-16 w-full min-h-screen overflow-y-auto bg-white">
        <div className="w-full max-w-md relative my-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0E2640] mb-2 tracking-tight">新規登録</h2>
            <p className="text-sm text-[#0E2640]/60 font-medium">IEUMと一緒に韓国留学の準備を始めましょう。</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name Fields */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">姓</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">名</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Furigana Fields */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">フリガナ(セイ)</label>
                <input 
                  type="text" 
                  name="furiganaLast"
                  value={formData.furiganaLast}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#0E2640] mb-1.5">フリガナ(メイ)</label>
                <input 
                  type="text" 
                  name="furiganaFirst"
                  value={formData.furiganaFirst}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* School */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">志望校</label>
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
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">性別</label>
              <div className="flex gap-2">
                {[
                  { id: 'male', label: '男性' },
                  { id: 'female', label: '女性' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gender: option.id }))}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      formData.gender === option.id 
                        ? 'bg-[#0E2640] border-[#0E2640] text-[#F0DDBD] shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-[#0E2640]/60 hover:bg-slate-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Korean Proficiency */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">韓国語レベル</label>
              <div className="flex gap-2">
                {[
                  { id: 'beginner', label: '初級' },
                  { id: 'intermediate', label: '中級' },
                  { id: 'advanced', label: '上級' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, proficiency: option.id }))}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      formData.proficiency === option.id 
                        ? 'bg-[#0E2640] border-[#0E2640] text-[#F0DDBD] shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-[#0E2640]/60 hover:bg-slate-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">メールアドレス</label>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@ieum.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
                />
                <button 
                  type="button"
                  className="shrink-0 px-4 py-3 bg-[#0E2640]/5 text-[#0E2640] hover:bg-[#0E2640]/10 text-xs font-bold rounded-lg transition-colors border border-[#0E2640]/10 whitespace-nowrap"
                >
                  重複確認
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">パスワード</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">パスワード確認</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-[#0E2640] hover:bg-[#16385e] text-[#F0DDBD] py-4 rounded-lg text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                新規登録
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-medium text-[#0E2640]/60">
            すでにアカウントをお持ちですか？{' '}
            <Link href="/login" className="text-[#0E2640] font-bold hover:underline cursor-pointer ml-1">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
