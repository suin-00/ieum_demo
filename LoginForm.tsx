'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h2 className="text-3xl font-extrabold text-[#0E2640] mb-2 tracking-tight">ログイン</h2>
            <p className="text-sm text-[#0E2640]/60 font-medium">IEUMへようこそ。</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">メールアドレス</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@ieum.com"
                className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E2640] mb-1.5">パスワード</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[#0E2640] text-sm focus:bg-white focus:border-[#0E2640] focus:ring-2 focus:ring-[#0E2640]/20 outline-none transition-all placeholder-slate-400 font-medium"
              />
              <div className="mt-2.5 text-right">
                <Link href="/reset-password" className="text-xs font-bold text-[#0E2640]/60 hover:text-[#0E2640] transition-colors">
                  パスワードをお忘れですか？
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-[#0E2640] hover:bg-[#16385e] text-[#F0DDBD] py-4 rounded-lg text-sm font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                ログイン
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-medium text-[#0E2640]/60">
            アカウントをお持ちではないですか？{' '}
            <Link href="/signup" className="text-[#0E2640] font-bold hover:underline cursor-pointer ml-1">
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
