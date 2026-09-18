import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentDashboard from "./_components/StudentDashboard";

export default async function StudentAfterMatchPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. matches 테이블 조회 (student_id, tutor_id, plan_sessions 등)
  const { data: match } = await supabase
    .from("matches")
    .select("id, tutor_id, plan_sessions, status")
    .eq("student_id", user.id)
    .maybeSingle();

  // 매칭 정보가 없거나 유효하지 않다면 매칭 전 페이지로 리다이렉트
  if (!match) {
    redirect("/students/matching");
  }

  // 2. 매칭된 튜터의 profiles 및 tutors 테이블 조인 조회
  let tutorInfo = null;
  if (match.tutor_id) {
    const { data: tutorProfile } = await supabase
      .from("profiles")
      .select(
        `
        nickname,
        furigana,
        tutors (
          school,
          major,
          bio,
          profile_image
        )
      `,
      )
      .eq("id", match.tutor_id)
      .single();

    if (tutorProfile) {
      const tutorSubInfo = Array.isArray(tutorProfile.tutors)
        ? tutorProfile.tutors[0]
        : tutorProfile.tutors;

      tutorInfo = {
        id: match.tutor_id,
        nickname: tutorProfile.nickname ?? "튜터",
        furigana: tutorProfile.furigana ?? "",
        university: tutorSubInfo?.school ?? "대학교",
        major: tutorSubInfo?.major ?? "전공",
        bio: tutorSubInfo?.bio ?? "안녕하세요! 즐겁게 한국어를 배워봐요.",
        imageUrl: tutorSubInfo?.profile_image ?? undefined,
      };
    }
  }

  // 3. 플랜 세션 정보 (matches 테이블의 plan_sessions 활용)
  const planInfo = {
    planSessions: match.plan_sessions ?? 4, // 기본값 4회 (스탠다드)
    status: match.status ?? "pending",
  };

  // 4. 다음 레슨 정보 (추후 스케줄 테이블 연동 대비 구조화)
  const nextLesson = null;

  return (
    <StudentDashboard
      initialTutor={tutorInfo}
      initialPlan={planInfo}
      initialNextLesson={nextLesson}
    />
  );
}
