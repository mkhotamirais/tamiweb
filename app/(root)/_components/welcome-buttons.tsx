"use client";

import { Button } from "@/components/ui/button";
import { useMm } from "@/hooks/useMm";
import Link from "next/link";

export function WelcomeButtons() {
  const { mm, openMm, closeMm, me, openMe, closeMe } = useMm();
  const onClick = () => {
    !mm ? openMm() : closeMm();
  };
  const onClickMe = () => {
    !me ? openMe() : closeMe();
  };
  return (
    <div className="flex gap-2">
      <Button onClick={onClickMe} variant="default" className="rounded-full w-32">
        About Me
      </Button>
      <Button className="rounded-full w-32" variant="outline" onClick={onClick}>
        Explore
      </Button>
      <Button asChild className="rounded-full w-32" variant="secondary" onClick={onClick}>
        <Link href="/projects">Projects</Link>
      </Button>
    </div>
  );
}
