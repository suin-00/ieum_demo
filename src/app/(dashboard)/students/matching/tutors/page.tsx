import { createClient } from "@/lib/supabase/server";
import { fetchFilteredTutors } from "@/lib/tutorService";
import { MatchingForm } from "../_components/MatchingForm";
import { TutorSearchParams } from "@/types/tutor.types"; // 👈 동일하게 import

interface PageProps {
  searchParams: Promise<TutorSearchParams>;
}

export default async function MatchingTutorsResultPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  console.log("받아온 튜터 검색 쿼리 파라미터:", params);
  const supabase = await createClient();

  const tutors = await fetchFilteredTutors(supabase, params);

  return (
    <div className="w-full h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-start pt-4 sm:pt-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl lg:max-w-5xl flex items-center justify-center">
        <MatchingForm initialTutors={tutors} />
      </div>
    </div>
  );
}
