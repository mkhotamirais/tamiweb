import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const data = await db.user.findUnique({ where: { email } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const data = await db.user.findUnique({ where: { id } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const data = await db.verificationToken.findFirst({ where: { email } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const data = await db.verificationToken.findUnique({ where: { token } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const data = await db.passwordResetToken.findFirst({ where: { email } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const data = await db.passwordResetToken.findUnique({ where: { token } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({ where: { email } });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId: string | undefined) => {
  try {
    const data = await db.twoFactorConfirmation.findUnique({ where: { userId } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({ where: { userId } });
    return account;
  } catch (error) {
    return null;
  }
};
