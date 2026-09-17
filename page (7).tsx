import React from 'react';
import Link from 'next/link';

export default function AdminStudentsPage() {
  const students = [
    {
      id: 'stu-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      grade: 'Grade 11',
      lessonsCount: 8,
      status: 'Active',
      tutor: 'Dr. Sarah Lin',
    },
    {
      id: 'stu-2',
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      grade: 'Grade 12',
      lessonsCount: 14,
      status: 'Active',
      tutor: 'Michael Chang',
    },
    {
      id: 'stu-3',
      name: 'Lucas Kim',
      email: 'lucas.kim@example.com',
      grade: 'Undergraduate',
      lessonsCount: 4,
      status: 'Pending Match',
      tutor: 'Unassigned',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-sm text-slate-500">View enrolled learners, tutor assignments, and account statuses.</p>
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
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Academic Level</th>
              <th className="px-6 py-3">Assigned Tutor</th>
              <th className="px-6 py-3">Lessons</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {students.map((stu) => (
              <tr key={stu.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{stu.name}</div>
                  <div className="text-xs text-slate-500">{stu.email}</div>
                </td>
                <td className="px-6 py-4">{stu.grade}</td>
                <td className="px-6 py-4 text-slate-800">{stu.tutor}</td>
                <td className="px-6 py-4">{stu.lessonsCount} sessions</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      stu.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {stu.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
