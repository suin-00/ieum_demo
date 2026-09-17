import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';

export default function LessonsPage() {
  const lessonList = [
    {
      matchId: 'match-cal-99',
      subject: 'AP Calculus BC: Derivatives & Series',
      tutor: 'Dr. Sarah Lin',
      date: 'Sept 15, 2026',
      time: '4:00 PM - 5:00 PM',
      status: 'Confirmed',
      rate: '$65',
    },
    {
      matchId: 'match-phy-88',
      subject: 'Physics Mechanics: Newton Laws',
      tutor: 'Michael Chang',
      date: 'Sept 18, 2026',
      time: '2:00 PM - 3:30 PM',
      status: 'Pending',
      rate: '$82.50',
    },
    {
      matchId: 'match-sat-77',
      subject: 'SAT Critical Reading & Writing',
      tutor: 'Elena Rostova',
      date: 'Sept 22, 2026',
      time: '5:00 PM - 6:00 PM',
      status: 'Completed',
      rate: '$50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Lessons & Schedule</h1>
            <p className="text-sm text-slate-500">Track matched instructors, review lesson links, and manage upcoming bookings.</p>
          </div>
        </div>

        <div className="space-y-4">
          {lessonList.map((les) => (
            <div
              key={les.matchId}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      les.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : les.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {les.status}
                  </span>
                  <span className="text-xs text-slate-400">Match ID: {les.matchId}</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900">{les.subject}</h2>
                <p className="text-xs text-slate-500">Instructor: {les.tutor} • {les.date}, {les.time}</p>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900">{les.rate}</span>
                <Link
                  href={`/lessons/${les.matchId}`}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
