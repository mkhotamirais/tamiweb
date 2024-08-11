import { LoaderPulse } from "@/components/loader-pulse";

export default async function Loading() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return <LoaderPulse />;
}
