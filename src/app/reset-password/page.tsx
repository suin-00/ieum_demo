"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setIsSaving(false);

    setMessage(
      error
        ? `비밀번호 변경 실패: ${error.message}`
        : "비밀번호가 변경되었습니다. 이제 새 비밀번호로 로그인해 주세요.",
    );

    if (!error) {
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0E2640]">비밀번호 변경</h1>
        <p className="mt-2 text-sm text-slate-600">
          새로 사용할 비밀번호를 입력해 주세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            새 비밀번호
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
              className="rounded-xl border p-2.5 text-slate-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            새 비밀번호 확인
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
              className="rounded-xl border p-2.5 text-slate-900"
            />
          </label>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[#0E2640] py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {isSaving ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
      </div>
    </main>
  );
}
