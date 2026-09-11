import SignupForm from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-2 text-sm text-gray-500">
            한국어 튜터링 플랫폼에 오신 것을 환영합니다.
          </p>
        </div>

        <SignupForm />

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>이미 계정이 있으신가요? </span>
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline hover:underline-offset-4 transition-colors"
          >
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
