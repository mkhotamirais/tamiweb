import Container from "@/components/wrapper";
import Link from "next/link";
import React from "react";

export default function ImgV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        <header className="h-12 flex items-center justify-center bg-gray-200 sticky top-0 px-3">
          <Link href="/vercel-img-v2" className="text-xl font-bold">
            Vercel Img V2
          </Link>
        </header>
        <main className="p-3 min-h-[calc(100vh-3rem)] bg-white">{children}</main>
      </Container>
    </div>
  );
}
