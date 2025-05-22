export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, setAuthCookie, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log(`${__filename} - `,ADMIN_CREDENTIALS);
    // Validate credentials (in a real app, this would check against a database)
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Create a token
      const token = await signToken(ADMIN_CREDENTIALS);
      
      // Return success response with token
      const response = NextResponse.json({ success: true, user: { id: ADMIN_CREDENTIALS.id, email: ADMIN_CREDENTIALS.email } });
      
      // Set cookie
      setAuthCookie(response, token);
      return response;
    }
    
    // Return error for invalid credentials
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "An error occurred during login" }, { status: 500 });
  }
}