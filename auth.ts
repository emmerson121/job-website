import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "./app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// console.log("GitHub ID exists:", !!process.env.AUTH_GITHUB_ID);
// console.log("GitHub Secret exists:", !!process.env.AUTH_GITHUB_SECRET);

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({adapter})



export const {auth, handlers, signIn, signOut} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
  GitHub,

  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
                token.name = user.name
            } 
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        }
    }
})