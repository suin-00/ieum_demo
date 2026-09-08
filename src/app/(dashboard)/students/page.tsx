import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function StudentAfterMatchPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // matches 테이블 조회
  const { data: match } = await supabase
    .from("matches")
    .select("id")
    .eq("student_id", user.id)
    .maybeSingle();

  // 매칭이 안 되어 있다면 매칭 전 페이지로 리다이렉트
  if (!match) {
    redirect("/students/matching");
  }

  return (
    <div>
      <h1>매칭 완료 페이지</h1>
      {/* 매칭 후 보여줄 내용 */}
    </div>
  );
}
