import React from "react";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen max-w-5xl mx-auto border-x shadow">{children}</div>;
}
