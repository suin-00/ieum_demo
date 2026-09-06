import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// GitHub API로 최신 커밋 시간을 직접 가져오는 함수
async function getLastCommitTime(): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/suin-00/ieum-demo/commits?per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "vnd.github+json",
          "User-Agent": "ieum-admin-dashboard", // 👈 GitHub API 필수 요구 사항
        },
        next: { revalidate: 60 },
      },
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const commitDate = data[0].commit.committer.date;
        return new Intl.DateTimeFormat("ko-KR", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Seoul",
        }).format(new Date(commitDate));
      }
    } else {
      console.error("GitHub API 응답 오류:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("GitHub API 호출 에러:", error);
  }
  return "정보 없음";
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count: tutorCount, error: tutorQueryError } = await supabaseAdmin
    .from("tutors")
    .select("id", { count: "exact", head: true });

  const isAdminAuthenticated = user?.email === "admin@ieum.com";
  const hasDatabaseError = Boolean(tutorQueryError);

  // Vercel 환경 변수 대신 GitHub API 호출 함수 실행 결과를 대입
  const atUpdated = await getLastCommitTime();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-500">IEUM ADMIN</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0E2640]">
          관리자 대시보드
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          서비스 운영 현황을 확인하고 관리 메뉴로 이동하세요.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-3">
        <Link
          href="/admin/tutors"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0E2640] hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">TUTORS</p>
              <h2 className="mt-2 text-xl font-bold text-[#0E2640]">
                튜터 관리
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                튜터 등록, 정보 수정, 삭제 및 비밀번호 변경 이메일 발송
              </p>
            </div>
            <span className="text-xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0E2640]">
              →
            </span>
          </div>
        </Link>

        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">SYSTEM STATUS</p>
          <h2 className="mt-2 text-xl font-bold text-[#0E2640]">시스템 상태</h2>
          <div className="mt-6 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-3 first:pt-0">
              <p className="text-xs font-bold text-slate-500">관리자 인증</p>
              <p
                className={`text-sm font-semibold ${
                  isAdminAuthenticated ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {isAdminAuthenticated ? "인증 완료" : "인증 확인 필요"}
              </p>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-xs font-bold text-slate-500">Supabase DB</p>
              <p
                className={`text-sm font-semibold ${
                  hasDatabaseError ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {hasDatabaseError ? "연결 오류" : "정상 연결"}
              </p>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-xs font-bold text-slate-500">등록된 튜터</p>
              <p className="text-lg font-bold text-[#0E2640]">
                {hasDatabaseError ? "-" : `${tutorCount ?? 0}명`}
              </p>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-xs font-bold text-slate-500">조회 상태</p>
              <p
                className={`text-sm font-semibold ${
                  hasDatabaseError ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {hasDatabaseError ? "실패" : "정상"}
              </p>
            </div>
            <div className="flex items-center justify-between py-3 last:pb-0">
              <p className="text-xs font-bold text-slate-500">at_updated</p>
              <p className="text-sm font-semibold text-slate-700">
                {atUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
