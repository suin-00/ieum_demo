'use client';

import React, { useState } from 'react';

export function ProfileEditSection() {
  const [grade, setGrade] = useState('High School (Junior)');
  const [subjects, setSubjects] = useState('Calculus, Physics, Academic Writing');
  const [goals, setGoals] = useState('Prepare for AP exams and score 750+ on SAT math section.');
  const [budget, setBudget] = useState('60');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div id="student-profile-edit-section" className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <h3 className="text-lg font-semibold text-slate-900">Student Learning Profile</h3>
      <p className="text-sm text-slate-500">Update your preferences to receive accurate tutor recommendations</p>

      {saved && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 border border-emerald-200">
          Profile preferences saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="grade-select" className="block text-xs font-medium text-slate-700">
            Current Academic Level
          </label>
          <select
            id="grade-select"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
          >
            <option value="Middle School">Middle School</option>
            <option value="High School (Freshman/Sophomore)">High School (Freshman/Sophomore)</option>
            <option value="High School (Junior)">High School (Junior)</option>
            <option value="High School (Senior)">High School (Senior)</option>
            <option value="College Undergraduate">College Undergraduate</option>
          </select>
        </div>

        <div>
          <label htmlFor="subjects-input" className="block text-xs font-medium text-slate-700">
            Target Subjects (comma separated)
          </label>
          <input
            id="subjects-input"
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="goals-input" className="block text-xs font-medium text-slate-700">
            Primary Learning Objective
          </label>
          <textarea
            id="goals-input"
            rows={2}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="budget-input" className="block text-xs font-medium text-slate-700">
            Maximum Hourly Budget ($/hr)
          </label>
          <input
            id="budget-input"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            id="save-profile-btn"
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditSection;
