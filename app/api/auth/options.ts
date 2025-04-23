// app/auth/options.ts
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [], // 認証プロバイダーは後で追加
};

export default authOptions;