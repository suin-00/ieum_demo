import Link from "next/link";
import { notFound } from "next/navigation";
import TutorPasswordResetButton from "@/components/tutors/TutorPasswordResetButton";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface TutorDetailPageProps {
  params: Promise<{ tutorId: string }>;
}

export default async function TutorDetailPage({
  params,
}: TutorDetailPageProps) {
  const { tutorId } = await params;
  const { data: tutor, error } = await supabaseAdmin
    .from("tutors")
    .select("*, profiles(email, name, furigana, gender)")
    .eq("id", tutorId)
    .single();

  if (error || !tutor) {
    notFound();
  }

  const profile = tutor.profiles;
  const gender =
    profile?.gender === "male"
      ? "남성"
      : profile?.gender === "female"
        ? "여성"
        : "-";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/tutors"
            className="text-sm text-slate-500 hover:text-[#0E2640]"
          >
            튜터 목록으로 돌아가기
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-[#0E2640]">
            {profile?.name ?? "이름 없음"} 상세 정보
          </h1>
        </div>
        <TutorPasswordResetButton tutorId={tutorId} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold text-slate-500">이메일</dt>
            <dd className="mt-1 text-slate-900">{profile?.email ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">후리가나</dt>
            <dd className="mt-1 text-slate-900">{profile?.furigana ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">성별</dt>
            <dd className="mt-1 text-slate-900">{gender}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">대학교</dt>
            <dd className="mt-1 text-slate-900">{tutor.school ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">전공</dt>
            <dd className="mt-1 text-slate-900">{tutor.major ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">수업 스타일</dt>
            <dd className="mt-1 text-slate-900">{tutor.style ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold text-slate-500">MBTI</dt>
            <dd className="mt-1 text-slate-900">{tutor.mbti ?? "-"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-bold text-slate-500">소개</dt>
            <dd className="mt-1 whitespace-pre-wrap text-slate-900">
              {tutor.bio ?? "-"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
