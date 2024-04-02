import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { authOptions } from "@/server/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
