import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createPublicClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // 💡 비회원/공개 페이지에서는 토큰을 갱신할 필요가 없으므로 setAll을 비워둡니다.
        setAll() {},
      },
    },
  );
}
