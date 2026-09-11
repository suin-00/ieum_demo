"use client";

import { useActionState } from "react";
import { loginWithEmail } from "@/actions/auth";

export default function LoginForm() {
  // state는 서버 액션에서 반환하는 { error: string } 객체를 받음
  const [state, formAction, isPending] = useActionState(loginWithEmail, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder="이메일"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          required
          placeholder="비밀번호"
          className="border p-2 w-full"
        />
      </div>

      {/* 에러 메시지 출력 */}
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white p-2 w-full"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
