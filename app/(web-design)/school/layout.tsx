"use client";

import React from "react";
import { useSchool } from "./_components/use-school";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { NotepadText } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestClientDialog from "./request-client-dialog";

export default function LayoutSchool1({ children }: { children: React.ReactNode }) {
  const { nav, hideNav } = useSchool();
  const handleClick = () => {
    if (nav) hideNav();
  };
  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen flex flex-col font-openSans">
      <Header />
      <main onClick={handleClick} className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer />
      <RequestClientDialog />
    </div>
  );
}
