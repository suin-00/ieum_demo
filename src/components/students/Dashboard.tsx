'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  ArrowRight, 
  GraduationCap, 
  Clock, 
  Sparkles, 
  LogOut, 
  Home, 
  HelpCircle, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { IntroSection } from './IntroSection';
import { ProfileEditSection } from './ProfileEditSection';

export interface DashboardProps {
  userRole?: 'student' | 'tutor' | 'admin';
  onOpenChat?: () => void;
  onLogout?: () => void;
  onGoHome?: () => void;
  onNavigateSupport?: () => void;
}

export function Dashboard({
  userRole = 'student',
  onOpenChat,
  onLogout,
  onGoHome,
  onNavigateSupport,
}: DashboardProps) {
  const upcomingLessons = [
    {
      id: 'l-1',
      tutorName: '김나연 튜터',
      university: '경북대학교',
      subject: '한국어 일상 회화 & 대학 생활 가이드',
      time: '오늘 오후 7:00 - 7:50',
      status: '확정됨',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nayeon&backgroundColor=dbeafe',
    },
    {
      id: 'l-2',
      tutorName: '박소연 튜터',
      university: '고려대학교',
      subject: '캠퍼스 시설 및 수강 신청 팁 질의응답',
      time: '9월 15일(월) 오후 6:00 - 6:50',
      status: '수업 대기',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Soyeon&backgroundColor=ede9fe',
    }
  ];

  return (
    <div id="student-dashboard" className="space-y-8">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0E2640] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            IU
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1E293B] tracking-tight">마이 페이지 (학생)</h1>
            <p className="text-xs font-semibold text-slate-500">목표: 연세대학교 경영학과 2026년 진학 준비</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onGoHome && (
            <button
              id="dashboard-btn-home"
              onClick={() => onGoHome?.()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              홈으로
            </button>
          )}

          {onNavigateSupport && (
            <button
              id="dashboard-btn-support"
              onClick={() => onNavigateSupport?.()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              문의하기
            </button>
          )}

          {onLogout && (
            <button
              id="dashboard-btn-logout"
              onClick={() => onLogout?.()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          )}
        </div>
      </div>

      {/* Intro Welcome Banner */}
      <IntroSection />

      {/* Quick Status Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">배정된 멘토</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-[#1E293B]">2명</p>
            <p className="text-xs text-slate-500 mt-0.5">경북대 김나연, 고려대 박소연</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link 
              href="/students/matching" 
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              새 튜터 추천받기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">수강 예정 수업</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-[#1E293B]">3회 남음</p>
            <p className="text-xs text-slate-500 mt-0.5">이번 주 예정: 2개 세션</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link 
              href="/lessons" 
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              전체 수업 일정 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">1:1 실시간 멘토링</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-[#1E293B]">새 메시지</p>
            <p className="text-xs text-slate-500 mt-0.5">튜터와 실시간 상담 가능</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button 
              onClick={() => onOpenChat?.()}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
            >
              채팅창 열기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upcoming Lessons & Tutor Connect (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-[#1E293B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                다가오는 수업
              </h3>
              <Link href="/lessons" className="text-xs font-bold text-slate-500 hover:text-slate-800">
                더보기
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingLessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={lesson.avatar} 
                      alt={lesson.tutorName} 
                      className="w-11 h-11 rounded-full bg-slate-200 object-cover border border-white shadow-2xs" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#1E293B]">{lesson.tutorName}</h4>
                        <span className="text-[11px] font-semibold text-slate-400">({lesson.university})</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{lesson.subject}</p>
                      <p className="text-[11px] font-bold text-blue-600 mt-1">{lesson.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                    >
                      강의실 입장
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2640] to-[#1E3A5F] text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FDE047] text-[#1E293B] mb-2">
                맞춤 매칭 서비스
              </span>
              <h3 className="text-lg font-extrabold leading-snug">나와 딱 맞는 튜터를 찾고 계신가요?</h3>
              <p className="text-xs text-slate-200 mt-1">지망 학과 및 관심 분야에 맞춘 최적의 선배 멘토를 추천해드립니다.</p>
            </div>
            <Link
              href="/students/matching"
              className="whitespace-nowrap px-5 py-2.5 rounded-full bg-white text-[#0E2640] text-xs font-extrabold hover:bg-yellow-300 hover:text-[#1E293B] transition shadow-xs"
            >
              튜터 매칭 바로가기
            </Link>
          </div>
        </div>

        {/* Right Column: Profile & Learning Goals (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ProfileEditSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
