import React from 'react';
import Link from 'next/link';

export function IntroSection() {
  return (
    <div id="student-intro-section" className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Welcome to Your Student Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600">
            Find vetted tutors, manage upcoming lessons, and track your personalized learning goals.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            id="browse-tutors-cta"
            href="/tutors"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Find a Tutor
          </Link>
          <Link
            id="view-lessons-cta"
            href="/lessons"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            My Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IntroSection;
