// app/auth/config.ts
import NextAuth from "next-auth";
import authOptions from "./options"; // ← authの設定ファイル

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;