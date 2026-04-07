import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Logic for Protected Routes (Admin / Profile)
  const isProtectedPath = pathname.includes('/admin') || pathname.includes('/profile');
  
  if (isProtectedPath) {
    const token = request.cookies.get('rim_auth_token')?.value;

    if (!token) {
      const locale = pathname.split('/')[1] || 'fr';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key-change-it");
      const { payload } = await jwtVerify(token, secret);
      
      // Admin check for /admin routes
      if (pathname.includes('/admin') && payload.role !== 'ADMIN') {
        const locale = pathname.split('/')[1] || 'fr';
        return NextResponse.redirect(new URL(`/${locale}/`, request.url));
      }
    } catch (e) {
      const locale = pathname.split('/')[1] || 'fr';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // 2. Delegate to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|fr)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
