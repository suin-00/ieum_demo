import React from 'react';
import Link from 'next/link';

export default function AdminTutorsPage() {
  const tutors = [
    {
      id: 'tut-1',
      name: 'Dr. Sarah Lin',
      email: 'sarah.lin@example.com',
      subjects: ['Calculus', 'Linear Algebra'],
      rate: '$65/hr',
      rating: 4.95,
      isVerified: true,
      students: 18,
    },
    {
      id: 'tut-2',
      name: 'Michael Chang',
      email: 'm.chang@example.com',
      subjects: ['Physics', 'Python'],
      rate: '$55/hr',
      rating: 4.9,
      isVerified: true,
      students: 14,
    },
    {
      id: 'tut-3',
      name: 'Elena Rostova',
      email: 'elena.r@example.com',
      subjects: ['Literature', 'SAT Prep'],
      rate: '$50/hr',
      rating: 4.88,
      isVerified: false,
      students: 6,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tutor Management & Verification</h1>
          <p className="text-sm text-slate-500">Audit tutor credentials, adjust rates, and view individual profiles.</p>
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
              <th className="px-6 py-3">Tutor</th>
              <th className="px-6 py-3">Subjects</th>
              <th className="px-6 py-3">Rate</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Verification</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {tutors.map((tut) => (
              <tr key={tut.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{tut.name}</div>
                  <div className="text-xs text-slate-500">{tut.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {tut.subjects.map((sub) => (
                      <span key={sub} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                        {sub}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">{tut.rate}</td>
                <td className="px-6 py-4 text-amber-600 font-medium">★ {tut.rating}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      tut.isVerified
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {tut.isVerified ? 'Verified' : 'Under Review'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/tutors/${tut.id}`}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Review Profile &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
