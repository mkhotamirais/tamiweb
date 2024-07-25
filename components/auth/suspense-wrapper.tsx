import React, { Suspense } from "react";

export function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="">Loading...</div>}>{children}</Suspense>;
}
