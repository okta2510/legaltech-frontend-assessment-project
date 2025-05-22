import { getServerUser } from '@/lib/auth-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getServerUser();
  
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }
  
  return NextResponse.json(user);
}