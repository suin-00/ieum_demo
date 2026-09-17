import React from 'react';
import Link from 'next/link';

interface TutorDetailPageProps {
  params: Promise<{
    tutorId: string;
  }>;
}

export default async function AdminTutorDetailPage({ params }: TutorDetailPageProps) {
  const { tutorId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/admin/tutors" className="text-xs font-medium text-slate-500 hover:text-slate-900">
              &larr; All Tutors
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-400">{tutorId}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Tutor Verification Profile</h1>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              ID: {tutorId}
            </span>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Instructor Account Details</h2>
            <p className="text-xs text-slate-500">Credential checks, lesson track record, and fee structure.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition"
            >
              Approve Verification
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Suspend Tutor
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Hourly Rate</p>
            <p className="text-lg font-bold text-slate-900">$65.00 / hr</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Background Clearance</p>
            <p className="text-lg font-bold text-emerald-600">Passed</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Overall Rating</p>
            <p className="text-lg font-bold text-amber-600">4.95 / 5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
