import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_EMAILS } from "@/constants/admin";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const userEmail = user?.email ?? "";
  const isAdmin = ADMIN_EMAILS.includes(userEmail);

  // 1. 관리자 로그인 페이지는 미들웨어 검사 제외
  if (pathname === "/admin-login") {
    if (user && !isAdmin) {
      const url = request.nextUrl.clone();
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      url.pathname = profile?.role === "tutor" ? "/tutors" : "/students";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // 2. 로그인하지 않은 유저가 보호된 라우트에 접근할 때
  if (
    !user &&
    (pathname.startsWith("/students") ||
      pathname.startsWith("/tutors") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/tutor") ||
      pathname.startsWith("/lessons") ||
      pathname.startsWith("/chats"))
  ) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  // 3. 로그인한 유저가 일반 로그인 / 관리자 로그인 페이지에 접근할 때만 튕겨내기 (/signup은 허용)
  if (user && (pathname === "/login" || pathname === "/admin-login")) {
    const url = request.nextUrl.clone();
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    url.pathname = profile?.role === "tutor" ? "/tutors" : "/students";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
