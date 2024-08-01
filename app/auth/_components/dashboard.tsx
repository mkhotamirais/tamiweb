"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User, UserRole } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FaPenToSquare, FaEye, FaTrashCan } from "react-icons/fa6";

export function Dashboard({ users }: { users: User[] | any | null }) {
  if (!users) {
    return <div>no user registered</div>;
  }

  return (
    <div className="px-3 max-w-3xl mx-auto mb-16">
      <h1 className="text-2xl text-center my-4 font-bold">User List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {users.map((user: User) => (
          <div key={user?.id} className="rounded flex flex-col gap-4 overflow-hidden shadow">
            <div className="p-3 flex flex-col gap-2 items-center">
              <Avatar>
                <AvatarImage src={user?.image ?? undefined} />
                <AvatarFallback className="bg-cyan-500">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-xl font-semibold">{user.name}</div>
            </div>
            <div className="flex">
              <Button
                title={`detail ${user.name}`}
                asChild
                variant="secondary"
                size="sm"
                className="w-full rounded-none"
              >
                <Link href={`/auth/admin/detail/${user.id}`}>
                  <FaEye />
                </Link>
              </Button>
              <Button asChild title={`update ${user.name}`} variant="default" size="sm" className="w-full rounded-none">
                <Link href={`/auth/admin/edit/${user.id}`}>
                  <FaPenToSquare />
                </Link>
              </Button>
              <Button title={`delete ${user.name}`} variant="destructive" size="sm" className="w-full rounded-none">
                <FaTrashCan />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
