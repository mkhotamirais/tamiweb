import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Mkhotami",
  description: "portofolio m khotami rais mengggunakan nextjs",
};

export default function LayoutPortofolioSaya({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
