import NextAuth from 'next-auth';
import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email"
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from 'pg'

// https://authjs.dev/reference/adapter/pg
const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  // adapter: PostgresAdapter(pool),
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    // Github({
    //   clientId: process.env.OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    // })
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/sign-in'
  }
});
