'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminKey, setAdminKey] = useState('');
  const [username, setUsername] = useState('');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Skeleton navigation to admin dashboard
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div id="admin-login-card" className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400">
            Internal Operations
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">Administrator Access</h1>
          <p className="mt-1 text-sm text-slate-400">Restricted portal for curriculum managers and staff</p>
        </div>

        <form onSubmit={handleAdminAuth} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-xs font-medium text-slate-300">
              Admin Identifier
            </label>
            <input
              id="admin-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@platform.internal"
              className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="admin-key" className="block text-xs font-medium text-slate-300">
              Security Token / Master Key
            </label>
            <input
              id="admin-key"
              type="password"
              required
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="••••••••••••••••"
              className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            id="admin-auth-submit-btn"
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition"
          >
            Authenticate & Open Console
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-300">
            &larr; Return to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
