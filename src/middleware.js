// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en-US', 'fr'];
const defaultLocale = 'fr'; // Set French as default

function getLocale(request) {
  // Get user's preferred language from header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Check if en-US is specifically requested, otherwise use French
  const preferredLocale = acceptLanguage.includes('en-US') ? 'en-US' : 'fr';
  
  return preferredLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // For root path ('/'), always redirect to French
  if (pathname === '/') {
    request.nextUrl.pathname = '/fr';
    return NextResponse.redirect(request.nextUrl);
  }

  // For other paths, use the locale detection but default to French
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|images|favicon.ico|robots.txt).*)',
  ],
};