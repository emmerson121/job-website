import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export default {
  providers: [GitHub, Google],

//   callbacks: {
//     authorized({ auth }) {
//       return !!auth;
//     },
//   },
} satisfies NextAuthConfig;