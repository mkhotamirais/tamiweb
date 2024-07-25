"use server";

import { currentUser, currentRole } from "@/lib/currentAuth";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "./auth-message";
import { AuthCard } from "./auth-card";

export async function UserGate({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user)
    return (
      <AuthCard title="Login First" backHref="/" backLabel="back to homepage">
        <FormError message="Login first to access this resource" />
      </AuthCard>
    );
  return <>{children}</>;
}

export async function AdminGate({ children }: { children: React.ReactNode }) {
  const role = await currentRole();
  if (role !== UserRole.ADMIN)
    return (
      <AuthCard title="Admin Only" backHref="/" backLabel="back to homepage">
        <FormError message="This page can only be accessed by an admin" />
      </AuthCard>
    );
  return <>{children}</>;
}
