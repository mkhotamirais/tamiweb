import Container from "@/components/wrapper";
import Link from "next/link";
import React from "react";

export default function TeoriLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        <header className="h-12 sticky top-0 bg-gray-300 flex items-center px-3">
          <Link href="/teori" className="text-xl font-bold">
            Teori
          </Link>
        </header>
        <main className="p-3 min-h-[calc(100vh-3rem)] bg-white border-x">{children}</main>
      </Container>
    </div>
  );
}
