"use client";

import { Button } from "@/components/ui/button";
import { useMmStore } from "@/hooks/useMmStore";

export default function WelcomePage() {
  const { showMm } = useMmStore();
  const onClick = () => {
    showMm();
  };
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="rounded-full w-32">
        About Me
      </Button>
      <Button className="rounded-full w-32" onClick={onClick}>
        Explore
      </Button>
    </div>
  );
}
