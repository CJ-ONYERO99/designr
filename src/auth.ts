import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const runtime = 'nodejs'; 

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
