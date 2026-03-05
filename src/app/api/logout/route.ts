import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear cookie
  res.cookies.set("admin-session", "", { httpOnly: true, expires: new Date(0) });

  return res;
}