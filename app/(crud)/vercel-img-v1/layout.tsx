import Link from "next/link";
import React from "react";

export default function ImgV1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="z-50 max-w-2xl sticky top-0 mx-auto bg-slate-100 h-14 flex items-center justify-center px-3">
        <Link href="/upload-image" className="text-xl text-black font-bold">
          Vercel Img V1
        </Link>
      </header>
      <main className="max-w-2xl mx-auto p-3 bg-white min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
