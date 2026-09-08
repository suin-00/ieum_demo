"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_EMAILS } from "@/constants/admin"; // 전역 상수 불러오기

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. 관리자 이메일인 경우 차단하되, 메시지는 일반 오류처럼 처리
    if (ADMIN_EMAILS.includes(email)) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
      return;
    }

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다."); // Supabase 기본 에러 메시지 대신 통일해도 좋습니다
      setLoading(false);
      return;
    }

    if (authData.user) {
      // 2. 로그인된 유저가 관리자일 경우 세션 끊고 동일하게 처리
      if (
        (authData.user.email && ADMIN_EMAILS.includes(authData.user.email)) ||
        authData.user.user_metadata?.role === "admin"
      ) {
        await supabase.auth.signOut();
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (!profileData) {
        setError("사용자 프로필 정보를 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      if (profileData.role === "tutor") {
        router.push("/tutors");
      } else if (profileData.role === "student") {
        const { data: matchData } = await supabase
          .from("matches")
          .select("id")
          .eq("student_id", authData.user.id)
          .maybeSingle();

        if (matchData) {
          router.push("/students");
        } else {
          router.push("/students/matching");
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            IEUM에서 과외를 이어가세요.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
