"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 반환 타입 인터페이스 정의 (any 사용 안 함)
export interface MatchResult {
  success: boolean;
  matchId?: string;
  error?: string;
}

// 👈 planSessions: number를 두 번째 인자로 추가합니다.
export async function createMatch(
  tutorId: string,
  planSessions: number,
): Promise<MatchResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const studentId = user.id;

  try {
    // 1. 이미 동일한 매칭이 존재하는지 확인
    const { data: existingMatch } = await supabase
      .from("matches")
      .select("id")
      .eq("student_id", studentId)
      .eq("tutor_id", tutorId)
      .maybeSingle();

    if (existingMatch) {
      return { success: true, matchId: existingMatch.id };
    }

    // 2. matches 테이블에 새로운 매칭 정보 삽입 (plan_sessions 포함)
    const { data, error } = await supabase
      .from("matches")
      .insert([
        {
          student_id: studentId,
          tutor_id: tutorId,
          status: "pending",
          plan_sessions: planSessions, // 👈 모달에서 넘어온 세션 수(4 또는 8) 저장
        },
      ])
      .select("id")
      .single();

    if (error || !data) {
      console.error("매칭 데이터 삽입 실패:", error);
      return { success: false, error: error?.message || "데이터 삽입 실패" };
    }

    revalidatePath("/students/matching");
    return { success: true, matchId: data.id };
  } catch (err: unknown) {
    console.error("서버 액션 에러:", err);
    const errorMessage =
      err instanceof Error ? err.message : "서버 오류가 발생했습니다.";
    return { success: false, error: errorMessage };
  }
}
