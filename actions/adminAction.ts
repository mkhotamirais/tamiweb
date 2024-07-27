"use server";

import { getUserById } from "@/data/authData";
import { currentUser } from "@/lib/currentAuth";
import { db } from "@/lib/db";
import { EditUserSchema, UserAccountSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { compare, hash } from "bcryptjs";

export const getUsers = async () => {
  const userSession = await currentUser();
  if (userSession?.role !== "ADMIN") return { error: "Unauthorized" };
  try {
    const data = await db.user.findMany();
    return data;
  } catch (error) {
    return null;
  }
};

export const editMe = async (id: string, values: z.infer<typeof UserAccountSchema>) => {
  const validatedFields = UserAccountSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
  const field = validatedFields.data;

  const existingUser = await getUserById(id);
  if (!existingUser || !existingUser.password) return { error: "User not found" };

  let data: { name: string | undefined; email: string | undefined; password?: string } = {
    name: field.name,
    email: field.email,
  };

  if (!field.oldPassword) {
    field.oldPassword = undefined;
    field.newPassword = undefined;
    field.confirmNewPassword = undefined;
  } else {
    const matchOldPassword = await compare(field.oldPassword, existingUser?.password);
    if (!matchOldPassword) return { error: "Password is incorrect" };
    if (field.newPassword) {
      const hashPass = await hash(field?.newPassword, 10);
      data = { ...data, password: hashPass };
    }
  }

  const userSession = await currentUser();
  if (!userSession) return { error: "Unauthorized" };
  if (userSession?.isOAuth) {
    data.email = undefined;
    data.password = undefined;
  }

  try {
    await db.user.update({ where: { id }, data });
    return { success: "Update user success" };
  } catch (error) {
    return { error: "Failed updated data" };
  }
};

export const editUserById = async (id: string, values: z.infer<typeof EditUserSchema>) => {
  const validatedFields = EditUserSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
  const field = validatedFields.data;

  const userSession = await currentUser();
  if (!userSession || userSession?.role !== "ADMIN") return { error: "Unauthorized" };
  if (userSession?.role === "ADMIN" && field.email === "tamiweb.01@gmail.com") {
    return { error: "Data admin utama tidak bisa diubah oleh admin lain" };
  }

  const existingUser = await getUserById(id);
  if (!existingUser) return { error: "No user found" };

  if (userSession.isOAuth) {
    field.email = undefined;
    field.isTwoFactorEnabled = undefined;
  }

  // if (values.email && values.email !== user.email) {
  //   const existingUser = await getUserByEmail(values.email);
  //   if (existingUser && existingUser.id !== user.id) return { error: "email already in use" };
  //   const verificationToken = await generateVerificationToken(values.email);
  //   await sendVerificationEmail(verificationToken.email, verificationToken.token);
  //   return { success: "verification email sent!" };
  // }

  await db.user.update({ where: { id }, data: field });
  return { success: "settings updated" };
};
