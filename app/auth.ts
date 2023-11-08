import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from 'pg'

// https://authjs.dev/reference/adapter/pg
const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: PostgresAdapter(pool),
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    // GitHub({
    //   clientId: process.env.OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    // })
  ],
  pages: {
    signIn: '/sign-in'
  }
});
