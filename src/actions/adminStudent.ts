"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { CreateStudentInput } from "@/types/student.types";

interface StudentActionResult {
  success: boolean;
  message: string;
}

export async function createStudentAccount(
  formData: CreateStudentInput,
): Promise<StudentActionResult> {
  try {
    const tempPassword = "tempPassword123!";
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: formData.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          name: formData.name,
          role: "student",
        },
      });

    if (authError || !authData.user) {
      throw new Error(authError?.message ?? "학생 계정 생성에 실패했습니다.");
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: authData.user.id,
        email: formData.email,
        name: formData.name,
        role: "student",
      });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(`학생 프로필 저장 실패: ${profileError.message}`);
    }

    return {
      success: true,
      message: `학생 계정이 생성되었습니다. 임시 비밀번호: ${tempPassword}`,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
