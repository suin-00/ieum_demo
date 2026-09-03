import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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
          cookiesToSet.forEach(({ name, value, options }) =>
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

  // 중요: createServerClient와 supabase.auth.getUser() 사이에
  // 다른 로직을 넣으면 세션이 풀릴 수 있으니 주의해야 해!
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않은 유저가 보호된 라우트(대시보드, 레슨, 채팅 등)에 접근할 때 로그인 페이지로 리다이렉트
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/students") ||
      request.nextUrl.pathname.startsWith("/tutors") ||
      request.nextUrl.pathname.startsWith("/lessons") ||
      request.nextUrl.pathname.startsWith("/chats"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
