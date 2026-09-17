import React from 'react';
import Link from 'next/link';

export default function AdminLessonsPage() {
  const lessons = [
    {
      id: 'les-101',
      student: 'Alex Rivera',
      tutor: 'Dr. Sarah Lin',
      subject: 'AP Calculus BC',
      status: 'confirmed',
      date: '2026-09-15 16:00 UTC',
      fee: '$65',
    },
    {
      id: 'les-102',
      student: 'Maya Patel',
      tutor: 'Michael Chang',
      subject: 'Physics Mechanics',
      status: 'completed',
      date: '2026-09-12 14:00 UTC',
      fee: '$82.50',
    },
    {
      id: 'les-103',
      student: 'Jordan Lee',
      tutor: 'Elena Rostova',
      subject: 'SAT Writing Prep',
      status: 'pending',
      date: '2026-09-18 18:30 UTC',
      fee: '$50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lesson Management</h1>
          <p className="text-sm text-slate-500">Monitor all scheduled, completed, and cancelled tutoring sessions.</p>
        </div>
        <Link
          href="/admin"
          className="text-xs text-slate-600 hover:text-slate-900 font-medium"
        >
          &larr; Back to Admin
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3">Lesson ID</th>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Tutor</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {lessons.map((les) => (
              <tr key={les.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-900">{les.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{les.student}</td>
                <td className="px-6 py-4">{les.tutor}</td>
                <td className="px-6 py-4">{les.subject}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{les.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      les.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : les.status === 'confirmed'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {les.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{les.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
