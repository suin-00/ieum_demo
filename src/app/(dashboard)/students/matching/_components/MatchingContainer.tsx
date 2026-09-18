import { createClient } from "@/lib/supabase/server";
import { MatchingForm } from "./MatchingForm";

interface ComponentProfile {
  id: string;
  nickname?: string; // 👈 메인으로 사용할 닉네임
  furigana?: string; // 👈 옆에 띄울 후리가나
  first_name?: string;
  last_name?: string;
  birth_date?: string | null;
  tutors?: {
    school?: string;
    major?: string;
    style?: string[] | string;
    profile_image?: string;
    background_image?: string[] | string;
  } | null;
  [key: string]: unknown;
}

const calculateAge = (birthDateString?: string | null): number | undefined => {
  if (!birthDateString) return undefined;
  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) return undefined;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export async function MatchingContainer() {
  const supabase = await createClient();

  // name을 아예 제외하고 조회
  const { data: tutorsData, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      nickname,
      furigana,
      first_name,
      last_name,
      birth_date,
      tutors (
        school,
        major,
        style,
        profile_image,
        background_image
      )
    `,
    )
    .eq("role", "tutor");

  if (error) {
    console.error("튜터 목록 조회 에러 상세:", JSON.stringify(error, null, 2));
  }

  const rawTutors = (tutorsData as ComponentProfile[]) || [];

  const tutors = rawTutors.map((t) => {
    const tutorInfo = t.tutors;

    const rawBg = tutorInfo?.background_image;
    const backgroundUrl = Array.isArray(rawBg)
      ? rawBg[0]
      : ((rawBg as string) ?? "/images/background.png");

    const birthDateStr = t.birth_date
      ? new Date(t.birth_date).toISOString().split("T")[0]
      : "";

    let formattedTags: string[] = [];
    const tutorStyle = tutorInfo?.style;
    if (Array.isArray(tutorStyle)) {
      formattedTags = tutorStyle;
    } else if (typeof tutorStyle === "string" && tutorStyle.trim() !== "") {
      formattedTags = tutorStyle.includes(",")
        ? tutorStyle.split(",").map((s) => s.trim())
        : [tutorStyle];
    }

    return {
      id: t.id,
      nickname: t.nickname ?? "튜터", // 👈 닉네임 매핑
      furigana: t.furigana ?? "", // 👈 후리가나 매핑
      firstName: t.first_name ?? "",
      lastName: t.last_name ?? "",
      birthDate: birthDateStr,
      age: calculateAge(t.birth_date),
      university: tutorInfo?.school ?? "대학교",
      major: tutorInfo?.major ?? "전공",
      imageUrl:
        (tutorInfo?.profile_image as string) ?? "/images/unified_profile.png",
      backgroundUrl: backgroundUrl,
      bio: "",
      tags: formattedTags,
    };
  });

  return <MatchingForm initialTutors={tutors} />;
}
