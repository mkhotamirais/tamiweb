"use client";

import { useMmStore } from "@/hooks/useMmStore";
import { SessionProvider } from "next-auth/react";
import React from "react";

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
