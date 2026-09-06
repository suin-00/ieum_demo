import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. 현재 로그인한 유저 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. profiles 또는 tutors 테이블에서 이 유저가 정말 'tutor' role인지 확인
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // 만약 역할이 tutor가 아니라면 접근 차단 (학생이 튜터 페이지로 온 경우 등)
  if (!profile || profile.role !== "tutor") {
    redirect("/students"); // 또는 권한 없음 페이지나 홈으로
  }

  return <>{children}</>;
}
