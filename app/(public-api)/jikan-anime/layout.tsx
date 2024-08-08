import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Jikan Anime",
    template: "%s | Jikan",
  },
  description: "Jikan Anime description",
};

export default async function JikanAnimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`bg-jikan-secondary text-jikan-neutral min-h-screen flex flex-col`}>
      <Header />
      <div className="px-3">{children}</div>
      <Footer />
    </div>
  );
}
