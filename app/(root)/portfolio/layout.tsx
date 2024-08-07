"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { usePortfolio } from "./_components/usePortfolio";
import Header from "./_components/header";
import Footer from "./_components/footer";

export default function LayoutPortofolioSaya({ children }: { children: React.ReactNode }) {
  const { nav, hideNav } = usePortfolio();
  const handleClick = () => {
    if (nav) hideNav();
  };
  return (
    <div className="font-merriweather min-h-screen flex flex-col justify-between">
      <Header />
      <main onClick={handleClick} className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
