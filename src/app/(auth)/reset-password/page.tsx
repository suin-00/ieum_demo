"use client";

import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    async function prepareRecoverySession() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const isRecoveryHash =
        hashParams.get("type") === "recovery" && accessToken && refreshToken;

      if (!code && !isRecoveryHash) {
        setMessage("비밀번호 변경 이메일의 링크로 접속해 주세요.");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          if (isMounted) {
            setMessage(
              `비밀번호 변경 링크가 유효하지 않습니다: ${error.message}`,
            );
          }
          return;
        }
      }

      if (isRecoveryHash && accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          if (isMounted) {
            setMessage(
              `비밀번호 변경 링크가 유효하지 않습니다: ${error.message}`,
            );
          }
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error || !data.session) {
        setMessage("비밀번호 변경 링크를 통해 다시 접속해 주세요.");
        return;
      }

      setIsSessionReady(true);
    }

    void prepareRecoverySession();

    return () => {
      isMounted = false;
    };
  }, []);

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
      window.setTimeout(() => router.push("/"), 1500);
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
            disabled={isSaving || !isSessionReady}
            className="rounded-xl bg-[#0E2640] py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {isSaving
              ? "변경 중..."
              : isSessionReady
                ? "비밀번호 변경"
                : "링크 확인 중..."}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
      </div>
    </main>
  );
}
