import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TutorFilterClient from "./_components/TutorFilterClient";

export default async function TutorFilterPage() {
  const supabase = await createClient();

  // 1. 유저 인증 체크
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. 이미 매칭된 내역이 있는지 체크 (id 속성이 실제로 존재하는지 확인)
  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("id")
    .eq("student_id", user.id)
    .maybeSingle();

  // 단순히 match가 아니라 match?.id가 확실히 있을 때만 리다이렉트
  if (!matchError && match?.id) {
    redirect("/students");
  }

  // 3. 매칭 내역이 없을 때만 필터 클라이언트 컴포넌트 렌더링
  return (
    <main className="w-full min-h-screen bg-[#d8e8f2]">
      <TutorFilterClient />
    </main>
  );
}
