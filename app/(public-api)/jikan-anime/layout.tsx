"use client";

import { Header } from "@/components/jikan-anime/header";
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
    </div>
  );
}
