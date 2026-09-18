import { createClient } from "@/lib/supabase/server";
import { MatchingForm } from "./MatchingForm"; // 클라이언트 UI 컴포넌트

interface ComponentProfile {
  id: string;
  name?: string;
  nickname?: string;
  bio?: string;
  age?: number;
  tags?: string[];
  // tutors 테이블 조인 결과 타입 정의
  tutors?: {
    school?: string;
    major?: string;
    profile_image?: string;
    background_image?: string[] | string;
  } | null;
  [key: string]: unknown;
}

export async function MatchingContainer() {
  const supabase = await createClient();

  // profiles 테이블을 조회하며 연결된 tutors 테이블의 정보를 함께(select) 가져옴
  const { data: tutorsData, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      tutors (
        school,
        major,
        profile_image,
        background_image
      )
    `,
    )
    .eq("role", "tutor");

  if (error) {
    console.error("튜터 목록 조회 에러:", error);
  }

  const rawTutors = (tutorsData as ComponentProfile[]) || [];
  console.log("Supabase Raw Tutors Data:", JSON.stringify(rawTutors, null, 2));

  // 데이터 가공 및 매핑
  const tutors = rawTutors.map((t) => {
    const tutorInfo = t.tutors; // tutors 조인 데이터 별도 변수 분리

    // 👈 t.background_image가 아니라 tutorInfo에서 가져와야 합니다!
    const rawBg = tutorInfo?.background_image;
    const backgroundUrl = Array.isArray(rawBg)
      ? rawBg[0]
      : ((rawBg as string) ?? "/images/background.png");

    return {
      id: t.id,
      name: t.name ?? t.nickname ?? "튜터",
      university: tutorInfo?.school ?? "대학교",
      major: tutorInfo?.major ?? "전공",
      // 👈 여기도 t.profile_image가 아니라 tutorInfo에서 가져오도록 수정!
      imageUrl:
        (tutorInfo?.profile_image as string) ?? "/images/unified_profile.png",
      backgroundUrl: backgroundUrl,
      bio: t.bio as string | undefined,
      age: t.age as number | undefined,
      tags: (t.tags as string[]) ?? [],
    };
  });

  // 클라이언트 애니메이션 컴포넌트에 데이터 전달
  return <MatchingForm initialTutors={tutors} />;
}
