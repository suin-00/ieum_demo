'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div id="reset-password-card" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
        <div className="text-center">
          <Link href="/login" className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600">
            &larr; Back to Login
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Reset your password</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your email address and we will send you a recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-lg bg-indigo-50 p-4 text-center">
            <p className="text-sm font-medium text-indigo-900">Recovery link dispatched!</p>
            <p className="mt-1 text-xs text-indigo-700">Check {email} for instructions to reset your password.</p>
            <Link
              href="/login"
              className="mt-4 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              Return to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-xs font-medium text-slate-700">
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              id="reset-submit-btn"
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              Send Password Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
