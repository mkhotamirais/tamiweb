"use server";

import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { genSalt, hash, compare } from "bcryptjs";
import { db } from "@/lib/db";
import {
  getPasswordResetTokenByToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  getUserByEmail,
  getVerificationTokenByToken,
} from "@/data/authData";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generatePasswordResetToken, generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendPasswordResetEmail, sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { signOut } from "@/auth";

export const logout = async () => {
  await signOut();
};

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };
  const { email, password, code } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);
    if (!user || !user.password) return { error: "Email or password is incorrect" };
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return { error: "Email or password is incorrect" };

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user?.email);
      if (verificationToken) {
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
      }
      return { success: "confirmation email sent!" };
    }

    if (user.isTwoFactorEnabled && user.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(user.email);
        if (!twoFactorToken) return { error: "Invalid code!" };
        if (twoFactorToken.token !== code) return { error: "invalid code!" };
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) return { error: "code expired" };
        await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
        const existingConfirmation = await getTwoFactorConfirmationByUserId(user.id);
        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
        }
        await db.twoFactorConfirmation.create({ data: { userId: user.id } });
      } else {
        const twoFactorToken = await generateTwoFactorToken(user.email);
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
        return { twoFactor: true };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };
  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) return { error: "Invalid fields!" };

  const salt = await genSalt(10);
  const hashPass = await hash(password, salt);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };

  await db.user.create({ data: { name, email, password: hashPass } });

  const verificationToken = await generateVerificationToken(email);
  if (verificationToken) {
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
  }
  return { success: "Confirmation email sent!" };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Token doesn't exist" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email doesn't exist!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });
  return { success: "Email verified" };
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid email" };
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "email not found" };
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
  return { success: "reset email sent" };
};

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
  if (!token) return { error: "Missing token" };
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields!" };
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "invalid token" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "token has expired" };
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "email does not exist" };
  const hashedPassword = await hash(password, 10);
  await db.user.update({ where: { id: existingUser.id }, data: { password: hashedPassword } });
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  return { success: "password updated" };
};
