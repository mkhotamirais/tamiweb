"use client";

import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import SearchTmdb from "./_components/SearchTmdb";

const menu = [
  { href: "home", label: "fullstack/tmdb", icon: AiFillHome },
  { href: "about", label: "fullstack/tmdb/about", icon: BsFillInfoCircleFill },
];

export default function LayoutTmdb({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <header className="bg-gray-900 h-16 px-3 md:px-16">
        <div className="h-full flex items-center justify-between">
          <Link href="/">Logo</Link>
          <SearchTmdb />
          <nav>
            <Link href="/fullstack/tmdb?genre=fetchTopRated">top rated</Link>
            <Link href="/fullstack/tmdb?genre=fetchTrending">trending</Link>
          </nav>
        </div>
      </header>
      <main className="px-3 md:px-16">{children}</main>
    </div>
  );
}
