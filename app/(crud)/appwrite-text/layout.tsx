import Container from "@/components/wrapper";
import React from "react";

export default function AppwriteTextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <Container>
        <header className="bg-gray-100 sticky top-0 h-12 flex items-center justify-center">
          <h1 className="text-xl font-bold">Appwrite Texts</h1>
        </header>
        <main className="p-3 min-h-[calc(100vh-3rem)]">{children}</main>
      </Container>
    </div>
  );
}
