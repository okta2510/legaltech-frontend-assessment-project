import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;
    
    // If there's no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      // Verify token
      const payload = await verifyToken(token);
      
      // If token is invalid, redirect to login
      if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      // Token is valid, allow request to proceed
      return NextResponse.next();
    } catch (error) {
      // Token verification failed, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};