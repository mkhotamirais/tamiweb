import Link from "next/link";
import React from "react";

export default function Crud1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow">
      <header className="h-16 bg-gray-100 border-b px-4 sticky top-0">
        <div className="flex h-full justify-between items-center">
          <Link href="/fullstack/crud1" className="text-2xl font-bold">
            Crud1
          </Link>
          <Link href="/fullstack/crud1/add" className="bg-gray-500 text-white p-3 rounded-full hover:opacity-70">
            Add Data
          </Link>
        </div>
      </header>
      <main className="min-h-screen p-4">{children}</main>
    </div>
  );
}
