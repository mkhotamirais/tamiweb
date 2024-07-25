import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const onClick = () => {
    signOut();
  };

  return (
    <Button onClick={onClick} size="sm" variant="outline" className="w-full">
      Logout
    </Button>
  );
}
