"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export function AuthSocial() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col gap-1 pt-3">
      <Button onClick={() => onClick("google")} variant="outline" className="w-full">
        <FcGoogle className="w-4 h-4 mr-2" /> <span>Login with google</span>
      </Button>
      {process.env.NODE_ENV === "development" && (
        <Button onClick={() => onClick("github")} variant="outline" className="w-full">
          <FaGithub className="w-4 h-4 mr-2" /> <span>Login with github</span>
        </Button>
      )}
    </div>
  );
}
