"use client";

import { Button } from "@/components/ui/button";
import { useMm } from "@/hooks/useMm";

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
      <Button onClick={onClickMe} variant="outline" className="rounded-full w-32">
        About Me
      </Button>
      <Button className="rounded-full w-32" onClick={onClick}>
        Explore
      </Button>
    </div>
  );
}
