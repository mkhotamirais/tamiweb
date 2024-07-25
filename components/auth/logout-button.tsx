"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const onClick = () => {
    signOut();
  };

  return (
    <button type="button" onClick={onClick} className="w-full">
      logout
    </button>
  );
}
