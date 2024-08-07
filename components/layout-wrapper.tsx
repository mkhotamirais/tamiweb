"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { useMm } from "@/hooks/useMm";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { mm, closeMm } = useMm();
  const onMouseEnter = () => {
    if (mm) closeMm();
  };

  return (
    <SessionProvider>
      <Toaster />
      <ToasterSonner richColors />
      <div onMouseEnter={onMouseEnter} className="min-h-screen w-full">
        {children}
      </div>
    </SessionProvider>
  );
}
