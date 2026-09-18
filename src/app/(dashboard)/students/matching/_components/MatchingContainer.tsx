import { createClient } from "@/lib/supabase/server";
import { MatchingForm } from "./MatchingForm";

interface ComponentProfile {
  id: string;
  nickname?: string;
  furigana?: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string | null;
  tutors?: {
    school?: string;
    major?: string;
    style?: string[] | string;
    profile_image?: string;
    background_image?: string[] | string; // 👈 Supabase에서 배열이나 문자열로 넘어옴
    bio?: string;
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
        background_image,
        bio
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

    // 💡 1. 배경 이미지 배열 파싱
    const rawBg = tutorInfo?.background_image;
    let bgUrlsArray: string[] = [];

    if (Array.isArray(rawBg)) {
      bgUrlsArray = rawBg; // 배열이면 그대로 사용
    } else if (typeof rawBg === "string" && rawBg.trim() !== "") {
      bgUrlsArray = [rawBg]; // 단일 문자열이면 배열로 감싸기
    }

    // 💡 2. 썸네일용(첫 번째) 배경과 전체 배경 배열 분리
    const backgroundUrl =
      bgUrlsArray.length > 0 ? bgUrlsArray[0] : "/images/background.png";
    const backgroundUrls =
      bgUrlsArray.length > 0 ? bgUrlsArray : ["/images/background.png"];

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

    const tutorBio = tutorInfo?.bio || "";

    return {
      id: t.id,
      nickname: t.nickname ?? "튜터",
      furigana: t.furigana ?? "",
      firstName: t.first_name ?? "",
      lastName: t.last_name ?? "",
      birthDate: birthDateStr,
      age: calculateAge(t.birth_date),
      university: tutorInfo?.school ?? "대학교",
      major: tutorInfo?.major ?? "전공",
      imageUrl:
        (tutorInfo?.profile_image as string) ?? "/images/unified_profile.png",

      // 💡 3. 분리한 배경 정보 할당
      backgroundUrl: backgroundUrl,
      backgroundUrls: backgroundUrls, // 전체 사진 배열 전달

      bio: tutorBio,
      tags: formattedTags,
    };
  });

  return <MatchingForm initialTutors={tutors} />;
}
