import { Suspense } from "react";
import PostsList from "./PostList";
import Container from "@/components/wrapper";
import { LoaderPulse } from "@/components/loader-pulse";

export default function DummyJosn() {
  return (
    <div className="bg-gray-50">
      <Container>
        <h1 className="text-3xl p-4 text-center font-bold">DummyJson Posts</h1>
        <Suspense fallback={<LoaderPulse />}>
          <PostsList />
        </Suspense>
      </Container>
    </div>
  );
}
