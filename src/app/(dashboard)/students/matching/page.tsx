import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import IntroSection from "@/components/common/HeroSection";
import ProfileEditSection from "@/app/(dashboard)/students/matching/_components/TutorFilter";
import MatchSection, {
  Tutor,
} from "@/app/(dashboard)/students/matching/_components/MatchingForm";

interface ComponentProfile {
  id: string;
  email: string;
  role: "student" | "tutor";
  name?: string;
  nickname?: string;
  profile_image?: string;
  university?: string;
  major?: string;
  bio?: string;
  age?: number;
  tags?: string[];
  [key: string]: unknown;
}

export default async function StudentMatchingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. 이미 매칭된 상태라면 /students로 돌려보내기
  const { data: match } = await supabase
    .from("matches")
    .select("*")
    .eq("student_id", user.id)
    .maybeSingle();

  if (match) {
    redirect("/students");
  }

  // 2. 학생 본인 프로필 정보 조회
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const rawProfile = profileData as ComponentProfile | null;
  const profile = rawProfile
    ? {
        ...rawProfile,
        name: rawProfile.name ?? rawProfile.nickname ?? "",
      }
    : null;

  // 3. 튜터 목록 조회
  const { data: tutorsData } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor");

  const rawTutors = (tutorsData as ComponentProfile[]) || [];

  // 4. Tutor 타입으로 안전하게 매핑 (순수 데이터 배열 생성)
  const tutors: Tutor[] = rawTutors.map((t) => ({
    id: t.id,
    name: t.name ?? t.nickname ?? "튜터",
    university: (t.university as string) ?? "대학교",
    major: (t.major as string) ?? "전공",
    imageUrl: (t.profile_image as string) ?? "images/unified_profile.png",
    bio: t.bio as string | undefined,
    age: t.age as number | undefined,
    tags: (t.tags as string[]) ?? [],
  }));

  return (
    <div className="min-h-screen w-full bg-white text-black py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-2xl font-bold">과외 매칭 대기실</h1>

        {/* 1. 이음 소개 */}
        <section className="border p-6 rounded-lg bg-white shadow-sm">
          <IntroSection />
        </section>

        {/* 2. 프로필 정보 수정 */}
        <section className="border p-6 rounded-lg bg-white shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">내 프로필 정보 수정</h2>
          <ProfileEditSection initialProfile={profile} />
        </section>

        {/* 3. 매칭 및 튜터 탐색 기능 (MatchingForm 내부에서 캐러셀, 그리드, 모달을 모두 처리) */}
        <section className="border p-6 rounded-lg bg-white shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">튜터 매칭</h2>
          {/* 함수는 일절 넘기지 않고, 순수 데이터(tutors)만 props로 전달합니다 */}
          <MatchSection initialTutors={tutors} />
        </section>
      </div>
    </div>
  );
}
