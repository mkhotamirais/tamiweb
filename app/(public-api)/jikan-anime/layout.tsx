"use client";

import React from "react";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function JikanAnimeLayout({ children }: { children: React.ReactNode }) {
  const { searchBox, hideSearchBox } = useJikanAnimeStore();
  const onMouseEnter = () => {
    if (searchBox) hideSearchBox();
  };
  return (
    <div className={`bg-jikan-secondary text-jikan-neutral min-h-screen flex flex-col`}>
      <Header />
      <main onMouseEnter={onMouseEnter} className="px-3 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
