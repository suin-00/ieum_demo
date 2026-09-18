import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MatchingContainer } from "./_components/MatchingContainer";

export default async function StudentMatchingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: match } = await supabase
    .from("matches")
    .select("*")
    .eq("student_id", user.id)
    .maybeSingle();

  if (match) {
    redirect("/students");
  }

  return (
    /* 
      💡 pt-6 또는 pt-10 등을 추가하여 상단 패딩을 줄 수 있습니다. 
      네비바 아래에서 살짝 여유를 두고 시작하고 싶을 때 유용합니다.
    */
    <div className="w-full h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-start pt-8 px-4">
      <div className="w-full max-w-4xl lg:max-w-5xl flex items-center justify-center">
        <MatchingContainer />
      </div>
    </div>
  );
}
