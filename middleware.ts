import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for robots.txt or sitemap.xml
  if (pathname === '/robots.txt') {
    // Redirect to the dynamic robots.txt API route
    return NextResponse.rewrite(new URL('/api/robots', request.url));
  }

  if (pathname === '/sitemap.xml') {
    // Redirect to the dynamic sitemap API route
    return NextResponse.rewrite(new URL('/api/sitemap', request.url));
  }

  // Continue with the request for all other paths
  return NextResponse.next();
}

// Configure the middleware to run only for specific paths
export const config = {
  matcher: ['/robots.txt', '/sitemap.xml'],
};
