import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://dummyjson.com/posts?limit=10");
  const data = await response.json();

  return (
    <div className="flex flex-col items-center">
      {data.posts.map((post: { id: number; title: string }) => (
        <Button asChild variant="link" key={post.id} className="text-lg font-medium">
          <Link href={`/dummyjson/${post.id}`}>{post.title}</Link>
        </Button>
      ))}
    </div>
  );
}
