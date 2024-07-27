"use client";

import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "./auth-message";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaHouse } from "react-icons/fa6";
import { useCurrentRole } from "@/hooks/useCurrentAuth";
import Link from "next/link";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const role = useCurrentRole();
  const router = useRouter();

  if (role !== UserRole.ADMIN)
    return (
      <Card className="max-w-md w-full mx-auto mt-32 flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-center">Admin Only</CardTitle>
        </CardHeader>
        <CardContent>
          <FormError message="This resource can only be accessed by admin" />
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={() => router.back()} variant="outline" size="icon" className="rounded-full">
            <FaChevronLeft />
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="/">
              <FaHouse />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  return <>{children}</>;
}
