'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/components/students/Dashboard';
import { Navbar } from '@/components/common/Navbar';

export default function StudentDashboardPage() {
  const router = useRouter();

  return (
    <div className="pt-16 md:pt-20 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Dashboard 
        userRole="student"
        onOpenChat={() => {
          // 채팅 페이지 또는 라우트로 전환
          router.push('/chats/1');
        }}
        onLogout={() => {
          router.push('/login');
        }}
        onGoHome={() => {
          router.push('/');
        }}
        onNavigateSupport={() => {
          router.push('/support'); // 필요시 고객센터 경로
        }}
      />
    </div>
  );
}