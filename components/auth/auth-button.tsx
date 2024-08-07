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
import { useMm } from "@/hooks/useMm";

type UserProps =
  | (User & {
      role: UserRole;
      email: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    })
  | undefined;

export function AuthButton({ user, className }: { user: UserProps; className?: string }) {
  const { mm, closeMm, openMm } = useMm();
  const onClick = () => {
    mm ? closeMm() : openMm();
  };

  if (!user) {
    return (
      <Button asChild size="sm" className={className}>
        <Link href="/auth/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500 text-white size-8">{user.email.substring(0, 2)}</AvatarFallback>
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
