"use client";

import { Merriweather } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useMmStore } from "@/hooks/useMmStore";
import { cn } from "@/lib/utils";

const font = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const { mm, showMm } = useMmStore();
  const onClick = () => {
    showMm();
  };

  return (
    <div className="px-3 flex flex-col gap-5 items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100 to-cyan-500">
      <div className="text-center">
        <h1 className={cn("text-4xl text-center font-bold mb-5 drop-shadow-md", font.className)}>Welcome</h1>
        <p className="text-xl font-medium">I am khotami, I am a web developer, my focus is react / nextjs</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-full w-32">
          About Me
        </Button>
        <Button className="rounded-full w-32" onClick={onClick}>
          Explore
        </Button>
      </div>
    </div>
  );
}
