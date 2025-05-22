import { User } from '@/types';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_please_change'
);

export async function getUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me');
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function signToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  
  return token;
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  return response;
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete('auth_token');
  return response;
}

// Re-export admin credentials for client usage
export const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
  id: '1',
  name: 'Admin'
};