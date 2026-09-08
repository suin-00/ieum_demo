import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import IntroSection from "@/components/students/matching/IntroSection";
import TutorListSection from "@/components/students/matching/TutorListSection";
import ProfileEditSection from "@/components/students/matching/ProfileEditSection";

export default async function StudentMatchingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. 이미 매칭된 상태라면 /students로 돌려보내기 (이중 방어)
  const { data: match } = await supabase
    .from("matches")
    .select("*")
    .eq("student_id", user.id)
    .maybeSingle();

  if (match) {
    redirect("/students");
  }

  // 2. 학생 본인 프로필 정보 조회
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 3. 튜터 목록 조회 (매칭 신청을 위해 전체 튜터 리스트 가져오기)
  const { data: tutors } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor");

  return (
    // 화면 전체를 흰색 배경으로 꽉 채우는 래퍼
    <div className="min-h-screen w-full bg-white text-black py-8 px-4">
      {/* 실제 콘텐츠가 들어갈 최대 폭 제한 박스 */}
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-2xl font-bold">과외 매칭 대기실</h1>

        {/* 1. 이음 소개 */}
        <section className="border p-6 rounded-lg bg-white shadow-sm">
          <IntroSection />
        </section>

        {/* 2. 프로필 정보 수정 */}
        <section className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">내 프로필 정보</h2>
          <ProfileEditSection initialProfile={profile} />
        </section>

        {/* 3. 튜터 목록 및 4. 매칭 기능 */}
        <section className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">튜터 목록 및 매칭 신청</h2>
          <TutorListSection tutors={tutors || []} studentId={user.id} />
        </section>
      </div>
    </div>
  );
}
