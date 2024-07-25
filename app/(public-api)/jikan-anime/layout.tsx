"use client";

import { Header } from "@/components/jikan-anime/header";
import { Footer } from "@/components/jikan-anime/footer";
import React from "react";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";

export default function JikanAnimeLayout({ children }: { children: React.ReactNode }) {
  const { searchBox, hideSearchBox } = useJikanAnimeStore();
  const onMouseEnter = () => {
    if (searchBox) hideSearchBox();
  };
  return (
    <div className={`bg-jikan-secondary text-jikan-neutral min-h-screen`}>
      <Header />
      <main onMouseEnter={onMouseEnter} className="px-3">
        {children}
      </main>
      <Footer />
    </div>
  );
}
