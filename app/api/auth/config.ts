// app/auth/config.ts
import NextAuth from "next-auth";
import authOptions from "./options"; // options.tsが存在している前提

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;