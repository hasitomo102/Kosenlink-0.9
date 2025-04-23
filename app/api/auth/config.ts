import NextAuth from "next-auth";
import authOptions from "./options"; // options.ts がある前提

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;