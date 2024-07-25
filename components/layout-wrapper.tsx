"use client";

import { useMmStore } from "@/hooks/useMmStore";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { AuthButton } from "./auth/auth-button";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { mm, hideMm } = useMmStore();
  const onMouseEnter = () => {
    if (mm) hideMm();
  };
  return (
    <SessionProvider>
      <div onMouseEnter={onMouseEnter} className="min-h-screen w-full">
        {children}
      </div>
    </SessionProvider>
  );
}
