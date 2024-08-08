"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";

type ContainerProps = { children: React.ReactNode; className?: string };
export default function Container({ children, className = "bg-white" }: ContainerProps) {
  return <div className={`${className} max-w-2xl mx-auto min-h-screen`}>{children}</div>;
}

export function TitlePage({ title, menu = [] }: { title: string; menu: { href: string; label: string }[] }) {
  return (
    <div className="bg-gray-50">
      <Container>
        <h1 className="text-xl font-bold p-3 text-center">{title}</h1>
        <Separator />
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-1">
          {menu?.map((item, i) => (
            <Button asChild key={i}>
              <Link href={item?.href}>{item?.label}</Link>
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
}
