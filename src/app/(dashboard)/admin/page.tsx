import React from 'react';
import Link from 'next/link';
import { AdminSystemStatus } from '@/components/admin/AdminSystemStatus';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Console</h1>
          <p className="text-sm text-slate-500">Manage students, verify instructors, and monitor platform activity.</p>
        </div>
      </div>

      <AdminSystemStatus />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold text-slate-900">Student Directory</h2>
          <p className="mt-1 text-xs text-slate-500">View enrolled students, update status, and manage matching queues.</p>
          <div className="mt-4">
            <Link
              href="/admin/students"
              className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition"
            >
              Manage Students &rarr;
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold text-slate-900">Tutor Verification</h2>
          <p className="mt-1 text-xs text-slate-500">Review teacher credentials, approve background checks, and adjust rates.</p>
          <div className="mt-4">
            <Link
              href="/admin/tutors"
              className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition"
            >
              Review Tutors &rarr;
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-semibold text-slate-900">Lesson Oversight</h2>
          <p className="mt-1 text-xs text-slate-500">Audit completed classes, handle disputes, and monitor feedback scores.</p>
          <div className="mt-4">
            <Link
              href="/admin/lessons"
              className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition"
            >
              View Lessons &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
