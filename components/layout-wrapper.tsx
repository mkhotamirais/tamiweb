"use client";

import { useMmStore } from "@/hooks/useMmStore";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { mm, hideMm } = useMmStore();
  const onMouseEnter = () => {
    if (mm) hideMm();
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
