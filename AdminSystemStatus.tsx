import React from 'react';
import { ADMIN_CONFIG, PLATFORM_METRICS } from '@/constants/admin';

export function AdminSystemStatus() {
  return (
    <div id="admin-system-status" className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Platform System Health</h2>
          <p className="text-sm text-slate-500">Real-time status of service infrastructure</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {ADMIN_CONFIG.systemStatus}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Active Students</p>
          <p className="text-xl font-bold text-slate-900">{PLATFORM_METRICS.activeStudents.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Verified Tutors</p>
          <p className="text-xl font-bold text-slate-900">{PLATFORM_METRICS.verifiedTutors.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Completed Lessons</p>
          <p className="text-xl font-bold text-slate-900">{PLATFORM_METRICS.completedLessons.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Average Rating</p>
          <p className="text-xl font-bold text-slate-900">★ {PLATFORM_METRICS.averageRating}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSystemStatus;
