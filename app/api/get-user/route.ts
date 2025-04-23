// app/api/get-user/route.ts

import { getUserWithEmail } from "@/app/lib/users"; // or "@/lib/users" if moved
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Missing email" },
      { status: 400 }
    );
  }

  try {
    const user = await getUserWithEmail(email);
    return NextResponse.json(user || null);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}