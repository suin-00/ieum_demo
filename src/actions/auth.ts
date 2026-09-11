"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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

export type SignupState = {
  error?: string;
  success?: boolean;
} | null;

export async function signupWithEmail(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = "student";

  const lastName = String(formData.get("last_name") ?? "").trim();
  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastNameKana = String(formData.get("last_name_kana") ?? "").trim();
  const firstNameKana = String(formData.get("first_name_kana") ?? "").trim();
  const nickname = `${lastNameKana}${firstNameKana}`.trim();
  const gender = String(formData.get("gender") ?? "").trim();
  const school = String(formData.get("school") ?? "").trim();
  const koreanLevel = String(formData.get("korean_level") ?? "").trim();

  if (ADMIN_EMAILS.includes(email)) {
    return { error: "사용할 수 없는 이메일입니다." };
  }

  if (await checkEmailDuplicate(email)) {
    return { error: "이미 사용 중인 이메일입니다." };
  }
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role },
    },
  });

  if (authError || !authData.user) {
    return { error: "회원가입 중 오류가 발생했습니다." };
  }

  const userId = authData.user.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    email: authData.user.email,
    role: "student",
    last_name: lastName,
    first_name: firstName,
    last_name_kana: lastNameKana || null,
    first_name_kana: firstNameKana || null,
    nickname: nickname || "user",
    gender,
    school,
    korean_level: koreanLevel,
  });

  if (profileError) {
    return { error: "프로필 생성 중 오류가 발생했습니다." };
  }

  const { error: studentError } = await supabase.from("students").insert({
    id: userId,
    school,
    korean_level: koreanLevel,
  });

  if (studentError) {
    return { error: "학생 정보 생성 중 오류가 발생했습니다." };
  }

  return { success: true };
}

export async function checkEmailDuplicate(email: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_email_exists", {
    target_email: email,
  });

  if (error) {
    console.error("Email check error:", error);
    return false;
  }

  return !!data; // true면 이미 존재하는 이메일(중복)
}
