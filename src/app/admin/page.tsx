import Link from "next/link";
import AdminSystemStatus from "@/app/admin/_components/AdminSystemStatus";
import { getAdminSystemStatus } from "@/lib/admin/getAdminSystemStatus";

export default async function AdminDashboardPage() {
  const systemStatus = await getAdminSystemStatus();

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
          className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0E2640] hover:shadow-md"
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

        <Link
          href="/admin/students"
          className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0E2640] hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">STUDENTS</p>
              <h2 className="mt-2 text-xl font-bold text-[#0E2640]">
                학생 관리
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                학생 계정과 학습 정보를 관리하세요.
              </p>
            </div>
            <span className="text-xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0E2640]">
              →
            </span>
          </div>
        </Link>

        <AdminSystemStatus status={systemStatus} />
      </section>
    </main>
  );
}
