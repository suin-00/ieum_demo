import React from 'react';
import Link from 'next/link';

export default function TutorDashboardPage() {
  const upcomingBookings = [
    {
      id: 'b-1',
      student: 'Alex Rivera',
      subject: 'AP Calculus BC',
      time: 'Tomorrow, 4:00 PM - 5:00 PM',
      status: 'Confirmed',
      rate: '$65',
    },
    {
      id: 'b-2',
      student: 'Emma Wilson',
      subject: 'Pre-Calculus Foundations',
      time: 'Thursday, 5:30 PM - 6:30 PM',
      status: 'Pending Acceptance',
      rate: '$65',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-base font-bold text-slate-900">
              Platform
            </Link>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-semibold text-indigo-600">Tutor Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/chats" className="text-xs font-medium text-slate-600 hover:text-indigo-600">
              Student Messages
            </Link>
            <Link href="/lessons" className="text-xs font-medium text-slate-600 hover:text-indigo-600">
              Schedule & Lessons
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Instructor Workspace</h1>
            <p className="text-sm text-slate-500">Manage lesson bookings, student inquiries, and teaching earnings.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition"
            >
              Update Availability
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs text-slate-500">Monthly Earnings</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">$2,450.00</p>
            <p className="mt-2 text-xs text-emerald-600">+12% vs last month</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs text-slate-500">Upcoming Lessons</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">8 sessions</p>
            <p className="mt-2 text-xs text-slate-500">Next class: Tomorrow at 4 PM</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs text-slate-500">Student Reviews</p>
            <p className="mt-1 text-2xl font-bold text-amber-500">★ 4.95</p>
            <p className="mt-2 text-xs text-slate-500">Based on 42 verified ratings</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold text-slate-900">Upcoming Student Requests</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{booking.student}</h3>
                  <p className="text-xs text-slate-500">{booking.subject} • {booking.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-900">{booking.rate}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
