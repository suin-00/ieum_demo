import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Auth State & Route Protection Middleware
 * Inspects incoming session cookies/tokens and handles routing for protected areas.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example auth token / session check
  const authToken = request.cookies.get('auth_token')?.value;

  // Protected route patterns
  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute =
    pathname.startsWith('/students') ||
    pathname.startsWith('/tutors') ||
    pathname.startsWith('/chats') ||
    pathname.startsWith('/lessons');

  // If unauthenticated access to admin routes, redirect to admin-login
  if (isAdminRoute && !authToken) {
    // In production/active session checks:
    // return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // If unauthenticated access to student/tutor dashboards, redirect to login
  if (isDashboardRoute && !authToken) {
    // In production/active session checks:
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
