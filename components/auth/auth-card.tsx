import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthSocial } from "./auth-social";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  titleDesc?: string;
  backLabel: string;
  backHref: string;
  showSocial?: boolean;
}

export function AuthCard({ backHref, backLabel, children, title, titleDesc, showSocial }: AuthCardProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="px-3 rounded-xl bg-white shadow-md max-w-md mx-4 my-4 w-full">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{titleDesc}</CardDescription>
          {showSocial && <AuthSocial />}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="link">
            <Link href={backHref}>{backLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
