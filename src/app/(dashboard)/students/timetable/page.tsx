'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Plus, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

import { Navbar } from '@/components/common/Navbar';

interface TimetableSlot {
  day: string;
  time: string;
  title: string;
  tutor: string;
  color: string;
  roomLink?: string;
}

export default function TimetablePage() {
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState('2026年 9月 2주차');

  const days = ['月 (9/8)', '火 (9/9)', '水 (9/10)', '木 (9/11)', '金 (9/12)', '土 (9/13)', '日 (9/14)'];
  const hours = [
    '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const scheduledSlots: Record<string, TimetableSlot> = {
    '金 (9/12)-19:00': {
      day: '金 (9/12)',
      time: '19:00 - 19:50',
      title: '韓国語 1:1 日常会話',
      tutor: 'キム・ナヨン メンター',
      color: 'bg-blue-100/90 text-blue-900 border-blue-200',
      roomLink: '/lessons/1',
    },
    '月 (9/8)-18:00': {
      day: '月 (9/8)',
      time: '18:00 - 18:50',
      title: '韓国大学 受講申請ガイダンス',
      tutor: 'パク・ソヨン メンター',
      color: 'bg-purple-100/90 text-purple-900 border-purple-200',
      roomLink: '/lessons/2',
    },
    '水 (9/10)-14:00': {
      day: '水 (9/10)',
      time: '14:00 - 14:50',
      title: 'キャンパス生活 Q&A',
      tutor: 'イ・ミンホ メンター',
      color: 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
      roomLink: '/lessons/3',
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pt-16">
      <Navbar />
      {/* Top Bar */}
      <header className="bg-[#0E2640] text-[#F5EBBC] px-4 sm:px-8 py-4 flex items-center justify-between sticky top-16 z-20 shadow-sm border-t border-white/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer text-[#F5EBBC]"
            aria-label="戻る"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tight">수업 시간표 (受講時刻表)</h1>
            <p className="text-xs text-[#F5EBBC]/70">週間メンタリング・レッスン日程</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/students/matching')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#F5EBBC] text-[#0E2640] px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-200 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            レッスン予約
          </button>
        </div>
      </header>

      {/* Main Schedule Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#0E2640]" />
            <span className="font-extrabold text-[#1E293B] text-base">{selectedWeek}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setSelectedWeek('今週')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              今週
            </button>
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timetable Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header: Days */}
            <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/80 text-center text-xs font-bold text-slate-600 py-3">
              <div className="text-slate-400">時間</div>
              {days.map((day, idx) => (
                <div key={idx} className={`${idx === 4 ? 'text-blue-600 font-extrabold' : ''}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Rows by hour */}
            <div className="divide-y divide-slate-100">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 min-h-[72px] items-stretch">
                  {/* Hour label */}
                  <div className="text-xs font-bold text-slate-400 flex items-center justify-center border-r border-slate-100 bg-slate-50/40">
                    {hour}
                  </div>

                  {/* 7 Days Columns */}
                  {days.map((day, dayIdx) => {
                    const slotKey = `${day}-${hour}`;
                    const slot = scheduledSlots[slotKey];

                    return (
                      <div 
                        key={dayIdx} 
                        className="border-r last:border-r-0 border-slate-100 p-1.5 relative group hover:bg-blue-50/20 transition flex flex-col justify-center"
                      >
                        {slot ? (
                          <div 
                            onClick={() => slot.roomLink && router.push(slot.roomLink)}
                            className={`rounded-xl p-2 border ${slot.color} shadow-2xs cursor-pointer hover:shadow-xs transition flex flex-col justify-between h-full`}
                          >
                            <div>
                              <span className="text-[10px] font-bold opacity-80 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {slot.time}
                              </span>
                              <p className="text-xs font-extrabold leading-tight mt-0.5">{slot.title}</p>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-[10px] font-bold opacity-90">
                              <User className="w-3 h-3" />
                              {slot.tutor}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full w-full rounded-lg hover:border hover:border-dashed hover:border-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            <span className="text-[10px] font-bold text-slate-400">+ 予約</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend and Info */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              予約済レッスンをクリックすると、レッスン詳細およびオンライン教室へアクセスできます。
            </span>
          </div>
          <button
            onClick={() => router.push('/lessons')}
            className="font-extrabold text-blue-700 hover:text-blue-900 underline whitespace-nowrap cursor-pointer"
          >
            レッスン一覧を見る →
          </button>
        </div>
      </main>
    </div>
  );
}
