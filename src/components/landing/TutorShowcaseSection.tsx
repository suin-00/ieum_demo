import React from "react";
import { createClient } from "@/lib/supabase/server";
import { TutorShowcaseContent, TutorItem } from "./TutorShowcaseContent";

interface ProfileRecord {
  id: string;
  name?: string;
  nickname?: string;
  university?: string;
  major?: string;
  age?: number;
  tags?: string[];
  bio?: string;
  profile_image?: string;
}

export async function TutorShowcaseSection() {
  const supabase = await createClient();

  // Supabase DB에서 role이 'tutor'인 프로필 데이터 조회 (최대 6명)
  const { data: tutorsData } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor")
    .limit(6);

  const rawTutors = (tutorsData as ProfileRecord[]) || [];

  // DB 데이터를 컴포넌트가 원하는 형태로 매핑 (목업 데이터 의존성 완전 제거)
  const tutors: TutorItem[] = rawTutors.map((t) => ({
    id: t.id,
    name: t.name ?? t.nickname ?? "튜터",
    university: t.university ?? "대학교",
    major: t.major ?? "전공",
    age: t.age ?? 22,
    tags: t.tags ?? ["Frontend", "React"],
    bio: t.bio ?? "안녕하세요! 튜터입니다.",
    imageUrl: t.profile_image || "/images/unified_profile.png",
  }));

  // 애니메이션 컴포넌트에 DB 데이터 전달
  return <TutorShowcaseContent tutors={tutors} />;
}
