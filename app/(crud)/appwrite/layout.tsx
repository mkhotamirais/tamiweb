import Link from "next/link";
import React from "react";

export default function Crud1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow">
      <div className="h-12 bg-gray-100 border-b px-4 sticky top-0 flex justify-center items-center">
        <Link href="/fullstack/crud1" className="text-xl font-bold">
          Appwrite Text
        </Link>
      </div>
      <main className="min-h-[calc(100vh-3rem)] p-3">{children}</main>
    </div>
  );
}
