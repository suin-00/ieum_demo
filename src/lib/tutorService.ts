import { SupabaseClient } from "@supabase/supabase-js";
import { Tutor } from "@/app/(dashboard)/students/matching/_components/MatchingForm";
import { ProfileTutorJoined, TutorSearchParams } from "@/types/tutor.types";

export const calculateAge = (
  birthDateString?: string | null,
): number | undefined => {
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

export const parseBackgroundUrls = (
  rawBg: string[] | string | null | undefined,
): { backgroundUrl: string; backgroundUrls: string[] } => {
  let bgUrlsArray: string[] = [];

  if (Array.isArray(rawBg)) {
    bgUrlsArray = rawBg.filter((url): url is string =>
      Boolean(url && url.trim() !== ""),
    );
  } else if (typeof rawBg === "string" && rawBg.trim() !== "") {
    bgUrlsArray = [rawBg];
  }

  const defaultBg = "/images/background.png";

  return {
    backgroundUrl: bgUrlsArray[0] || defaultBg,
    backgroundUrls: bgUrlsArray.length > 0 ? bgUrlsArray : [defaultBg],
  };
};

export async function fetchFilteredTutors(
  supabase: SupabaseClient,
  params: TutorSearchParams,
): Promise<Tutor[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id, nickname, furigana, first_name, last_name, birth_date,
      tutors!inner ( 
        school, major, style, interests, profile_image, background_image, bio,
        current_students, max_students 
      )
    `,
    )
    .eq("role", "tutor");

  if (error) {
    console.error("튜터 필터링 조회 에러:", error.message);
    return [];
  }

  const tutorsData = (data as unknown as ProfileTutorJoined[]) || [];

  const universityQuery = params.university?.trim();
  const isUniUnspecified = !universityQuery || universityQuery === "未定";

  const userInterests = params.interests
    ? params.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];
  const isAnyInterest =
    userInterests.length === 0 || userInterests.includes("なんでもOK！");

  // 가중치(Score) 계산 및 정원 마감 필터링 수행
  const scoredTutors = tutorsData
    .map((t) => {
      const tutorInfo = t.tutors as ProfileTutorJoined["tutors"] & {
        current_students?: number | null;
        max_students?: number | null;
      };

      if (!tutorInfo) return null;

      const currentStudents = tutorInfo.current_students ?? 0;
      const maxStudents = tutorInfo.max_students ?? 5;

      // 🚨 조건 1: 현재 학생 수가 최대 정원이 찼거나 넘치면 무조건 제외
      if (currentStudents >= maxStudents) {
        return null;
      }

      let score = 0;

      // 🎓 조건 2: 대학교 가중치 (일치하면 가장 세게 +50점, 미정이면 생략)
      if (!isUniUnspecified && tutorInfo.school) {
        if (
          tutorInfo.school.toLowerCase().includes(universityQuery.toLowerCase())
        ) {
          score += 50;
        }
      }

      // 👥 조건 3: 현재 학생 수가 적을수록 가중치 부여
      const studentCountBonus = Math.max(0, (5 - currentStudents) * 6);
      score += studentCountBonus;

      // 배열 타입 안전하게 변환
      const styleArray = Array.isArray(tutorInfo.style)
        ? tutorInfo.style
        : typeof tutorInfo.style === "string"
          ? [tutorInfo.style]
          : [];

      const interestArray = Array.isArray(tutorInfo.interests)
        ? tutorInfo.interests
        : typeof tutorInfo.interests === "string"
          ? [tutorInfo.interests]
          : [];

      // 📚 조건 4: 선택한 관심사(interests)와 튜터 style/interests 비교 가중치
      if (!isAnyInterest) {
        const tutorTraits = [...styleArray, ...interestArray];

        const matchCount = userInterests.filter((ui) =>
          tutorTraits.some(
            (tt) =>
              typeof tt === "string" && (tt.includes(ui) || ui.includes(tt)),
          ),
        ).length;

        score += matchCount * 15;
      }

      // 성향(Style) 세부 필터 가중치 추가 반영
      const userStyles = [
        params.energy,
        params.communication,
        params.structure,
        params.goal,
      ].filter(Boolean);

      if (userStyles.length > 0) {
        const styleMatchCount = userStyles.filter((us) =>
          styleArray.some((ts: string) => Boolean(us && ts.includes(us))),
        ).length;
        score += styleMatchCount * 10;
      }

      const { backgroundUrl, backgroundUrls } = parseBackgroundUrls(
        tutorInfo.background_image,
      );

      const styleTags = styleArray.filter(
        (s): s is string => typeof s === "string",
      );
      const interestTags = interestArray.filter(
        (i): i is string => typeof i === "string",
      );

      const formattedTags = Array.from(
        new Set([...styleTags, ...interestTags]),
      ).filter(Boolean);

      const mappedTutor = {
        tutor: {
          id: t.id,
          nickname: t.nickname ?? "튜터",
          furigana: t.furigana ?? "",
          age: calculateAge(t.birth_date),
          university: tutorInfo.school ?? "대학교",
          major: tutorInfo.major ?? "전공",
          imageUrl: tutorInfo.profile_image ?? "/images/unified_profile.png",
          backgroundUrl,
          backgroundUrls,
          bio: tutorInfo.bio || "",
          tags: formattedTags,
        } as Tutor,
        score,
      };

      return mappedTutor;
    })
    .filter((t): t is { tutor: Tutor; score: number } => t !== null);

  // 🏆 가중치 점수가 높은 순(내림차순)으로 정렬
  scoredTutors.sort((a, b) => b.score - a.score);

  // 📏 최소 3명 ~ 최대 5명까지만 잘라서 반환
  const targetCount = Math.min(Math.max(scoredTutors.length, 0), 5);
  const finalTutors = scoredTutors.slice(0, targetCount);

  return finalTutors.map((item) => item.tutor);
}
