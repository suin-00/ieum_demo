'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, Calendar, Crown, Layers, BarChart3, CalendarDays, MessageSquare, MessageCircle, ChevronRight, Clock } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isMatched, setIsMatched] = useState(true);

  return (
    <div className="relative w-full min-h-[100dvh] bg-slate-50 pt-16 pb-24">
      <Navbar />
      {/* Dev Toggle for "매칭 전/후" */}
      <div className="absolute top-20 left-4 md:left-8 z-40 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex items-center p-1 text-xs font-bold">
        <button
          onClick={() => setIsMatched(false)}
          className={`px-3 py-1.5 rounded-full transition-colors ${!isMatched ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          매칭 전
        </button>
        <button
          onClick={() => setIsMatched(true)}
          className={`px-3 py-1.5 rounded-full transition-colors ${isMatched ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          매칭 후
        </button>
      </div>

      {!isMatched ? (
        <div className="h-full w-full pt-12 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-bold text-slate-700 mb-4">매칭된 튜터가 없습니다.</h2>
          <button 
            onClick={() => router.push('/students/matching')}
            className="px-6 py-3 bg-[#235499] text-white rounded-xl font-bold hover:bg-[#1a3f73] transition-colors"
          >
            추천 튜터 보기
          </button>
        </div>
      ) : (
        <div className="pt-12 pb-24 md:pb-8 px-4 md:px-8 max-w-6xl mx-auto h-full bg-[#F8FAFC]">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">수업</h1>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Hero Card */}
            <div className="bg-[#F4F9FF] rounded-3xl shadow-sm border border-[#E2F0FF] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-sm overflow-hidden bg-blue-100 flex justify-center items-end">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Nayeon&backgroundColor=dbeafe" alt="Tutor" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="text-xs font-bold text-slate-500 mb-1">담당 튜터</div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h2 className="text-2xl font-extrabold text-[#1E293B]">김나연 튜터</h2>
                  <CheckCircle2 className="w-5 h-5 text-blue-500" fill="currentColor" stroke="white" />
                </div>
                <p className="text-sm text-slate-500 font-medium mb-3">한국어 / 일본어 <span className="mx-1">|</span> 경북대학교 3학년</p>
              </div>
            </div>

            {/* Lesson Grid Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 flex flex-col">
                <h3 className="text-lg font-extrabold text-[#1E293B] flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-[#235499]" /> 다가오는 수업
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { date: '9.12', day: '금', time: '오후 7:00 - 7:50', title: '일본어 회화 연습 (1:1)' },
                    { date: '9.15', day: '월', time: '오후 6:00 - 6:50', title: '일본어 문법 정리' }
                  ].map((lesson, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[#F4F9FF] text-[#235499]">
                        <span className="font-extrabold text-lg leading-none">{lesson.date}</span>
                        <span className="text-[10px] font-bold mt-1">({lesson.day})</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 font-medium mb-1">{lesson.time}</p>
                        <h4 className="font-extrabold text-[#1E293B]">{lesson.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 flex flex-col">
                <h3 className="text-lg font-extrabold text-[#1E293B] flex items-center gap-2 mb-6">
                  <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 선택한 수업 플랜
                </h3>
                <h4 className="text-base font-extrabold text-[#1E293B] mb-6">일본어 회화 집중 플랜 (주 2회, 50분)</h4>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1">남은 수업 횟수</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#235499]">6</span>
                      <span className="text-lg font-bold text-slate-400">/ 10회</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
                  <div className="bg-[#235499] h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}