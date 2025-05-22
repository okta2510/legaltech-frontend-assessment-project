import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });
    clearAuthCookie(response);
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: "An error occurred during logout" }, { status: 500 });
  }
}