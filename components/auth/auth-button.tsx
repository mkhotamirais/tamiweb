"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import type { User, UserRole } from "@prisma/client";
import { useMmStore } from "@/hooks/useMmStore";

type UserProps =
  | (User & {
      role: UserRole;
      email: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    })
  | undefined;

export function AuthButton({ user }: { user: UserProps }) {
  const { mm, hideMm } = useMmStore();

  const onClick = () => {
    if (mm) hideMm();
  };

  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href="/auth/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">{user.email.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Button onClick={onClick} asChild size="sm" variant="link">
            <Link href="/auth/account" className="w-full">
              Account
            </Link>
          </Button>
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Button onClick={onClick} asChild size="sm" variant="link">
              <Link href="/auth/admin" className="w-full">
                Dashboard
              </Link>
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
