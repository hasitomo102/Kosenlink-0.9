import { getUserWithEmail } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing 'email' query parameter" }, { status: 400 });
  }

  try {
    const user = await getUserWithEmail(email, true);
    return NextResponse.json(user || null);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}