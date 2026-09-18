"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  Calendar,
  Video,
  User,
  BookOpen,
  Clock,
  Layers,
} from "lucide-react";
import Image from "next/image";

export interface TutorInfo {
  id: string;
  nickname: string;
  furigana?: string;
  university: string;
  major: string;
  bio: string;
  imageUrl?: string;
}

export interface PlanInfo {
  planSessions: number;
  status: string;
}

export interface NextLesson {
  date: string;
  time: string;
  topic: string;
}

export interface StudentDashboardProps {
  initialTutor?: TutorInfo | null;
  initialPlan?: PlanInfo | null;
  initialNextLesson?: NextLesson | null;
}

export default function StudentDashboard({
  initialTutor,
  initialPlan,
  initialNextLesson,
}: StudentDashboardProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 섹션 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0e2640]">
            マイレッスン
          </h1>
          <p className="mt-2 text-gray-600">
            チューターとの学習状況や次の予定を確認できます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 왼쪽/메인 영역: 다음 레슨 & 튜터 정보 */}
          <div className="md:col-span-2 space-y-6">
            {/* 다가오는 레슨 카드 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0e2640]" />
                  次回のレッスン
                </h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                {initialNextLesson ? (
                  <>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {initialNextLesson.date} {initialNextLesson.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>{initialNextLesson.topic}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">
                    予定されているレッスンはありません。
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  disabled={!initialNextLesson}
                  className="w-full bg-[#0e2640] hover:bg-[#0a1d31] disabled:bg-gray-200 disabled:cursor-not-allowed text-[#F5EBBC] font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-5 h-5" />
                  レッスンに入場する
                </button>
              </div>
            </div>

            {/* 튜터 정보 카드 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0e2640]" />
                担当チューター
              </h2>

              {initialTutor ? (
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0 flex items-center justify-center overflow-hidden relative">
                    {initialTutor.imageUrl ? (
                      <Image
                        src={initialTutor.imageUrl}
                        alt={initialTutor.nickname}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {initialTutor.nickname}
                      </h3>
                      {initialTutor.furigana && (
                        <span className="text-xs text-gray-400 truncate">
                          {initialTutor.furigana}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {initialTutor.university} · {initialTutor.major}
                    </p>
                    <p className="text-sm text-gray-700 mt-3 bg-gray-50 p-3 rounded-lg leading-relaxed">
                      &quot;{initialTutor.bio}&quot;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 text-center py-6">
                  매칭된 튜터 정보가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽/사이드 영역: 퀵 액션 및 플랜 정보 */}
          <div className="space-y-6">
            {/* 플랜 요약 카드 (matches.plan_sessions 연동) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0e2640]" />
                契約プラン
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                현재{" "}
                <span className="font-bold text-[#0e2640]">
                  {initialPlan?.planSessions === 8
                    ? "集中プラン (월 8회)"
                    : "スタンダードプラン (월 4회)"}
                </span>{" "}
                をご利用中です。
              </p>
              <div className="text-xs bg-slate-50 p-3 rounded-xl text-slate-500 flex justify-between items-center border border-slate-100">
                <span>매칭 상태</span>
                <span className="font-bold uppercase text-blue-600">
                  {initialPlan?.status}
                </span>
              </div>
            </div>

            {/* 채팅으로 이동 */}
            <div className="bg-[#0e2640] rounded-2xl p-6 shadow-sm text-white">
              <h3 className="font-bold text-lg text-[#F5EBBC] mb-2">
                チューターと連絡
              </h3>
              <p className="text-sm text-gray-300 mb-6">
                レッスンの質問や日時の変更などはこちらからメッセージを送ってください。
              </p>
              <button
                onClick={() => router.push("/chats")}
                className="w-full bg-[#F5EBBC] hover:bg-white text-[#0e2640] font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                チャットを開く
              </button>
            </div>

            {/* 스케줄 확인 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">スケジュール管理</h3>
              <p className="text-sm text-gray-600 mb-4">
                全体のレッスンスケジュールを確認・調整できます。
              </p>
              <button
                onClick={() => router.push("/students/schedule")}
                className="w-full border-2 border-gray-200 hover:border-[#0e2640] text-gray-700 hover:text-[#0e2640] font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                カレンダーを見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
