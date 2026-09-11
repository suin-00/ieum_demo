"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_EMAILS } from "@/constants/admin";

// 1. 폼 상태(State)에 대한 명확한 타입 정의
export type LoginState = {
  error?: string;
} | null;

export async function loginWithEmail(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (ADMIN_EMAILS.includes(email)) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const supabase = await createClient();
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError || !authData.user) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  if (
    (authData.user.email && ADMIN_EMAILS.includes(authData.user.email)) ||
    authData.user.user_metadata?.role === "admin"
  ) {
    await supabase.auth.signOut();
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (!profileData) {
    return { error: "사용자 프로필 정보를 찾을 수 없습니다." };
  }

  let redirectPath = "/";

  if (profileData.role === "tutor") {
    redirectPath = "/tutors";
  } else if (profileData.role === "student") {
    const { data: matchData } = await supabase
      .from("matches")
      .select("id")
      .eq("student_id", authData.user.id)
      .maybeSingle();

    redirectPath = matchData ? "/students" : "/students/matching";
  }

  redirect(redirectPath);
}
