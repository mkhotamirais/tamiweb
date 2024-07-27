import { UserRole } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "name is required",
    }),
    email: z.string().email({
      message: "email is required",
    }),
    password: z.string().min(6, {
      message: "minimal 6 characters is required",
    }),
    confirmPassword: z.string().min(6, {
      message: "minimal 6 characters is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm password doen't match",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
});

export const ResetSimpleSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minimum 6 characters required",
  }),
});

// const UserAccountSchema = z.object({
//   name: z.string().nonempty({ message: "Name is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   oldPassword: z.string().optional(),
//   newPassword: z.string().optional(),
//   confirmNewPassword: z.string().optional(),
// });

export const UserAccountSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    oldPassword: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    confirmNewPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.oldPassword && !data.newPassword) return false;
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) return false;
      return true;
    },
    { message: "Password is required", path: ["oldPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmNewPassword) return false;
      return true;
    },
    { message: "Confirm new password wrong", path: ["confirmNewPassword"] }
  );

export const EditUserSchema = z.object({
  name: z.optional(z.string().min(1, { message: "Name is required" })),
  email: z.optional(z.string().email({ message: "Email is required" })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});
