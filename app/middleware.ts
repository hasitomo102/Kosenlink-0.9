import { auth } from "@/app/auth/config";
import { NextResponse, type NextRequest } from "next/server";

// Auth v5: https://authjs.dev/reference/nextjs#in-middleware
// upgrade guide: https://authjs.dev/guides/upgrade-to-v5

export async function middleware(request: NextRequest) {
  const session = await auth(); // 認証セッションを取得

  if (request.nextUrl.pathname.startsWith("/profile") && !session?.user?.email) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next(); // 認証済みならそのまま進む
}

// 必要ならマッチ対象の設定も
export const config = {
  matcher: ["/profile"],
};