// app/admin-login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // 클라이언트용 supabase 생성 함수

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();

    // 진짜 Supabase 로그인 실행
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("로그인 실패: " + error.message);
      setLoading(false);
      return;
    }

    // 로그인 성공 후 관리자 메인 대시보드로 이동
    router.push("/admin");
    router.refresh();
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h1>관리자 / 튜터 전용 로그인</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          marginTop: "20px",
        }}
      >
        {errorMsg && (
          <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>
        )}
        <input
          type="email"
          placeholder="관리자 이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "로그인 중..." : "관리자 로그인"}
        </button>
      </form>
    </main>
  );
}
