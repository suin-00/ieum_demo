import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          IEUM
        </h1>
        <p className="text-gray-600 text-sm">
          대학생을 위한 스마트한 1:1 과외 매칭 및 학습 관리 플랫폼
        </p>

        <div className="flex flex-col space-y-3 pt-4">
          <Link
            href="/signup"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors text-center"
          >
            회원가입하기
          </Link>
          <Link
            href="/login"
            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors text-center"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
