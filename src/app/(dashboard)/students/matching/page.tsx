import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MatchingContainer } from "./_components/MatchingContainer";

export default async function StudentMatchingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 이미 매칭된 상태라면 /students로 돌려보내기
  const { data: match } = await supabase
    .from("matches")
    .select("*")
    .eq("student_id", user.id)
    .maybeSingle();

  if (match) {
    redirect("/students");
  }

  // 인증 및 리다이렉트가 끝나면 데이터 컨테이너 렌더링
  return <MatchingContainer />;
}
