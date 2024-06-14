import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      //   role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        const client = await db.client.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });
        const lawyer = await db.lawyer.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });

        const admin = await db.admin.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });

        const user = client
          ? { ...client, type: "client", id: client.id }
          : admin
          ? { ...admin, type: "admin", id: admin.id }
          : { ...lawyer, type: "lawyer", id: lawyer?.id };

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          email: user.email,
          id: user.id,
          image: {
            type: user.type,
            id: user.id,
          },
        };
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
