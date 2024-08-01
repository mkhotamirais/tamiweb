import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ContactHeader } from "./_components/header";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3">
      <div className="max-w-xl mx-auto">
        <ContactHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
