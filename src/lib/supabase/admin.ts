"use server";

import { supabaseAdmin } from "@/lib/supabase/admin"; // 👈 admin.ts 경로에 맞게 수정해주세요
import { revalidatePath } from "next/cache";

export async function createMatch(studentId: string, tutorId: string) {
  try {
    // 1. 이미 동일한 매칭이 존재하는지 확인 (선택사항)
    const { data: existingMatch, error: checkError } = await supabaseAdmin
      .from("matches")
      .select("id")
      .eq("student_id", studentId)
      .eq("tutor_id", tutorId)
      .maybeSingle();

    if (existingMatch) {
      // 이미 매칭이 존재한다면 그대로 성공 처리 혹은 기존 ID 반환
      return { success: true, matchId: existingMatch.id };
    }

    // 2. matches 테이블에 새로운 매칭 정보 삽입
    const { data, error } = await supabaseAdmin
      .from("matches")
      .insert([
        {
          student_id: studentId,
          tutor_id: tutorId,
          status: "pending", // 초기 매칭 상태 (필요에 따라 수정)
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("매칭 데이터 삽입 실패:", error);
      return { success: false, error: error.message };
    }

    // 3. 페이지 캐시 갱신
    revalidatePath("/students/matching");

    return { success: true, matchId: data.id };
  } catch (err) {
    console.error("서버 액션 에러:", err);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}
