import { supabaseAdmin } from "@/lib/supabase/admin";
import TutorForm from "@/components/tutors/TutorForm";
import TutorTable from "@/components/tutors/TutorTable";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function AdminTutorsPage() {
  const { data: tutors, error } = await supabaseAdmin
    .from("tutors")
    // ✅ 1. name 대신 nickname을 포함한 바뀐 컬럼명들(또는 profiles(*))로 수정
    .select(
      "*, profiles(email, nickname, first_name, last_name, furigana, gender)",
    );

  const sortedTutors = [...(tutors ?? [])].sort((leftTutor, rightTutor) =>
    // ✅ 2. 정렬 기준도 name 대신 nickname으로 변경
    (leftTutor.profiles?.nickname ?? "").localeCompare(
      rightTutor.profiles?.nickname ?? "",
      "ko",
    ),
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/admin"
          aria-label="관리자 홈으로 이동"
          title="관리자 홈"
          className="rounded-lg p-2 text-[#0E2640] transition-colors hover:bg-white hover:text-slate-600"
        >
          <Home size={22} strokeWidth={2} />
        </Link>
        <h1 className="text-3xl font-bold text-[#0E2640]">
          튜터 관리 백오피스
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-[#0E2640] mb-4">
            신규 튜터 등록
          </h2>
          <TutorForm />
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {error && (
            <p className="text-red-500 text-sm">
              목록을 불러오는 데 실패했습니다.
            </p>
          )}

          <TutorTable tutors={sortedTutors} />
        </div>
      </div>
    </div>
  );
}
