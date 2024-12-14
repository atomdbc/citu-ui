// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en-US', 'fr'];
const defaultLocale = 'fr';

// Add public files that should be accessible without locale
const publicFiles = [
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico'
];

function getLocale(request) {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLanguage.includes('en-US') ? 'en-US' : 'fr';
  return preferredLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Don't redirect public files
  if (publicFiles.includes(pathname)) {
    return;
  }

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
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};