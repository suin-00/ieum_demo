// actions/adminTutor.ts
"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type {
  CreateTutorInput,
  TutorActionResult,
  UpdateTutorInput,
} from "@/types/tutor.types";

export async function createTutorAccount(
  formData: CreateTutorInput,
): Promise<TutorActionResult> {
  try {
    const tempPassword = "qwerty123";

    // 1. Supabase Auth 계정 생성 (user_metadata에 이름 추가)
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: formData.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          sub: "", // Supabase가 생성 후 자동 할당하므로 비워두거나 생략해도 무방합니다
          name: formData.name,
          furigana: formData.furigana,
          gender: formData.gender,
          role: "tutor",
          email: formData.email,
          email_verified: true,
          phone_verified: false,
        },
      });

    if (authError || !authData.user) {
      throw new Error(authError?.message ?? "계정 생성에 실패했습니다.");
    }

    const userId = authData.user.id;

    // 2. profiles 테이블에 기본 정보 저장
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert([
        {
          id: userId,
          email: formData.email,
          name: formData.name,
          furigana: formData.furigana,
          gender: formData.gender,
          role: "tutor",
        },
      ]);

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(`프로필 저장 실패: ${profileError.message}`);
    }

    // 3. tutors 테이블에 튜터 상세 정보 저장
    const { error: tutorError } = await supabaseAdmin.from("tutors").upsert([
      {
        id: userId,
        school: formData.school,
        major: formData.major,
        style: formData.style,
        mbti: formData.mbti,
        bio: formData.bio,
        rating: 0.0,
        review_count: 0,
        max_students: 5,
        current_students: 0,
      },
    ]);

    if (tutorError) {
      await supabaseAdmin.from("profiles").delete().eq("id", userId);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(`튜터 상세 정보 저장 실패: ${tutorError.message}`);
    }

    return {
      success: true,
      message: `튜터 계정이 성공적으로 생성되었습니다.`,
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

export async function deleteTutorAccounts(
  tutorIds: string[],
): Promise<TutorActionResult> {
  try {
    if (tutorIds.length === 0) {
      return { success: false, message: "삭제할 튜터를 선택해 주세요." };
    }

    const { error: tutorError } = await supabaseAdmin
      .from("tutors")
      .delete()
      .in("id", tutorIds);

    if (tutorError) {
      throw new Error(`튜터 정보 삭제 실패: ${tutorError.message}`);
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .in("id", tutorIds);

    if (profileError) {
      throw new Error(`프로필 삭제 실패: ${profileError.message}`);
    }

    for (const tutorId of tutorIds) {
      const { error: authError } =
        await supabaseAdmin.auth.admin.deleteUser(tutorId);

      if (authError) {
        throw new Error(`Auth 사용자 삭제 실패: ${authError.message}`);
      }
    }

    return { success: true, message: "튜터가 삭제되었습니다." };
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

export async function updateTutorAccount(
  tutorId: string,
  formData: UpdateTutorInput,
): Promise<TutorActionResult> {
  try {
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        name: formData.name,
        furigana: formData.furigana,
        gender: formData.gender,
      })
      .eq("id", tutorId);

    if (profileError) {
      throw new Error(`프로필 수정 실패: ${profileError.message}`);
    }

    const { error: tutorError } = await supabaseAdmin
      .from("tutors")
      .update({
        school: formData.school,
        major: formData.major,
        style: formData.style,
        mbti: formData.mbti,
        bio: formData.bio,
      })
      .eq("id", tutorId);

    if (tutorError) {
      throw new Error(`튜터 정보 수정 실패: ${tutorError.message}`);
    }

    return { success: true, message: "튜터 정보가 수정되었습니다." };
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

export async function sendTutorPasswordResetEmail(
  tutorId: string,
): Promise<TutorActionResult> {
  try {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", tutorId)
      .single();

    if (profileError || !profile?.email) {
      throw new Error(
        `튜터 이메일 조회 실패: ${profileError?.message ?? "이메일이 없습니다."}`,
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const { error: resetError } =
      await supabaseAdmin.auth.resetPasswordForEmail(profile.email, {
        redirectTo: `${siteUrl}/reset-password`,
      });

    if (resetError) {
      throw new Error(`비밀번호 변경 이메일 발송 실패: ${resetError.message}`);
    }

    return {
      success: true,
      message: `${profile.email}로 비밀번호 변경 이메일을 보냈습니다.`,
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
