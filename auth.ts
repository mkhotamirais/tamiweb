import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getAccountByUserId, getTwoFactorConfirmationByUserId, getUserById } from "./data/authData";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account }) {
      await db.user.update({ where: { id: user.id }, data: { provider: account?.provider, lastLogin: new Date() } });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const [existingUser, twoFactorConfirmation] = await Promise.all([
        getUserById(user.id),
        getTwoFactorConfirmationByUserId(user.id),
      ]);
      // const existingUser = await getUserById(user.id);

      if (existingUser) {
        await db.user.update({
          where: { id: existingUser?.id },
          data: { provider: account?.provider, lastLogin: new Date() },
        });
      }

      // if (account?.provider !== "credentials") return true;
      // if (!existingUser?.emailVerified) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);
        if (!twoFactorConfirmation) return false;
        // delete two factor confirmation for next signin
        await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      // const existingUser = await getUserById(token.sub);
      // const existingAccount = await getAccountByUserId(existingUser.id);
      const [existingUser, existingAccount] = await Promise.all([
        getUserById(token.sub),
        getAccountByUserId(token.sub),
      ]);
      if (!existingUser) return token;

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.eamil = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
