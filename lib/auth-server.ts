import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { User } from '@/types';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_development_only'
);

export async function signToken(payload: any): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
  
  return token;
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getServerUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const payload = await verifyToken(token);
    return payload as User;
  } catch {
    return null;
  }
}

export async function setAuthCookie(response: NextResponse, token: string): Promise<NextResponse> {
  response.cookies.set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return response;
}

export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: 'auth-token',
    value: '',
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  
  return response;
}

// Admin credentials (in a real app, this would be in a database)
export const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123', // In production, use hashed passwords
  id: '1',
  name: 'Admin'
};