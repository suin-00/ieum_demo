import { createClient } from "@/lib/supabase/server";
import { MatchingForm } from "./MatchingForm"; // 클라이언트 UI 컴포넌트

interface ComponentProfile {
  id: string;
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

export async function MatchingContainer() {
  const supabase = await createClient();

  // 튜터 목록 조회
  const { data: tutorsData } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor");

  const rawTutors = (tutorsData as ComponentProfile[]) || [];

  // 데이터 가공 및 매핑
  const tutors = rawTutors.map((t) => ({
    id: t.id,
    name: t.name ?? t.nickname ?? "튜터",
    university: (t.university as string) ?? "대학교",
    major: (t.major as string) ?? "전공",
    imageUrl: (t.profile_image as string) ?? "/images/unified_profile.png",
    bio: t.bio as string | undefined,
    age: t.age as number | undefined,
    tags: (t.tags as string[]) ?? [],
  }));

  // 클라이언트 애니메이션 컴포넌트에 데이터 전달
  return <MatchingForm initialTutors={tutors} />;
}
