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

  // 1. role이 'tutor'인 프로필 총 인원 수 조회 (exact, head: true 로 데이터 전송 없이 카운트만 가져옴)
  const { count: totalTutorCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "tutor");

  // 2. 렌더링할 최대 6명의 튜터 프로필 데이터 조회
  const { data: tutorsData } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor")
    .limit(6);

  const rawTutors = (tutorsData as ProfileRecord[]) || [];

  const tutors: TutorItem[] = rawTutors.map((t) => ({
    id: t.id,
    name: t.name ?? t.nickname ?? "チューター",
    university: t.university ?? "大学",
    major: t.major ?? "専攻",
    age: t.age ?? 22,
    tags: t.tags ?? ["Frontend", "React"],
    bio: t.bio ?? "よろしくお願いします！",
    imageUrl: t.profile_image || "/images/unified_profile.png",
  }));

  // 실제 DB에 등록된 총 인원 수 전달 (데이터가 없거나 조회 실패 시 기본값 0 처리)
  const tutorCount = totalTutorCount ?? tutors.length;

  return <TutorShowcaseContent tutors={tutors} totalCount={tutorCount} />;
}
