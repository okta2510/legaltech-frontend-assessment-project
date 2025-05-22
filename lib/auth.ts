import { User } from '@/types';
import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

// Admin credentials (in a real app, this would be in a database)
export const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123', // In production, use hashed passwords
  id: '1',
  name: 'Admin'
};

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
    console.log(`${__filename} - `,token);
  return token;
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
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