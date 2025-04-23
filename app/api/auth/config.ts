// app/auth/config.ts
import NextAuth from "next-auth";
import authOptions from "./options"; // すでに仮で作ったやつ

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;