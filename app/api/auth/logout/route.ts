import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await logout();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
