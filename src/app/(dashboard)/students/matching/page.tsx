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

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-6">
      {/* 
        scale을 쓰지 않고 max-w와 w-full을 통해 큰 모니터에서도 
        양옆 공간을 충분히 확보하여 카드가 잘리지 않도록 합니다.
      */}
      <div className="w-full max-w-4xl lg:max-w-5xl flex items-center justify-center">
        <MatchingContainer />
      </div>
    </div>
  );
}
