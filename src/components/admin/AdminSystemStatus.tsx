import type { AdminSystemStatus } from "@/lib/admin/getAdminSystemStatus";

interface AdminSystemStatusProps {
  status: AdminSystemStatus;
}

export default function AdminSystemStatus({ status }: AdminSystemStatusProps) {
  return (
    <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">SYSTEM STATUS</p>
      <h2 className="mt-2 text-xl font-bold text-[#0E2640]">시스템 상태</h2>

      <div className="mt-6 divide-y divide-slate-100">
        <div className="flex items-center justify-between py-3 first:pt-0">
          <p className="text-xs font-bold text-slate-500">관리자 인증</p>
          <p
            className={`text-sm font-semibold ${
              status.isAdminAuthenticated ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {status.isAdminAuthenticated ? "인증 완료" : "인증 확인 필요"}
          </p>
        </div>

        <div className="flex items-center justify-between py-3">
          <p className="text-xs font-bold text-slate-500">Supabase DB</p>
          <p
            className={`text-sm font-semibold ${
              status.hasDatabaseError ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {status.hasDatabaseError ? "연결 오류" : "정상 연결"}
          </p>
        </div>

        <div className="flex items-center justify-between py-3">
          <p className="text-xs font-bold text-slate-500">등록된 튜터</p>
          <p className="text-lg font-bold text-[#0E2640]">
            {status.tutorCount === null ? "-" : `${status.tutorCount}명`}
          </p>
        </div>

        <div className="flex items-center justify-between py-3">
          <p className="text-xs font-bold text-slate-500">조회 상태</p>
          <p
            className={`text-sm font-semibold ${
              status.hasDatabaseError ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {status.hasDatabaseError ? "실패" : "정상"}
          </p>
        </div>

        <div className="flex items-center justify-between py-3 last:pb-0">
          <p className="text-xs font-bold text-slate-500">at_updated</p>
          <p className="text-sm font-semibold text-slate-700">
            {status.atUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
