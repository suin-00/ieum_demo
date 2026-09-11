import LoginForm from "@/components/auth/LogInForm";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default async function LoginPage() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // 로그인 페이지에 들어오면 기존 세션 로그아웃 처리

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        {/* 헤더 (타이틀) 영역 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
          <p className="mt-2 text-sm text-gray-500">
            계정에 로그인하여 서비스를 이용해 보세요.
          </p>
        </div>

        {/* 클라이언트 컴포넌트 호출 (상태 관리는 이 안에서 알아서 됨) */}
        <LoginForm />

        {/* 부가 메뉴 (비밀번호 찾기, 회원가입 유도) */}
        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-600">
          <Link
            href="/reset-password"
            className="hover:text-blue-600 hover:underline hover:underline-offset-4 transition-colors"
          >
            비밀번호를 잊으셨나요?
          </Link>
          <div className="flex gap-1">
            <span>아직 계정이 없으신가요?</span>
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:underline hover:underline-offset-4 transition-colors"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
