"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type TPost = {
  $id: string;
  title: string;
  description: string;
};

export default function Crud1Page() {
  const [post, setPost] = useState<TPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/appwrite/api");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.log("error: ", error);
        setError("failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/fullstack/crud1/api/${id}`, { method: "DELETE" });
      setPost((prev) => prev?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("failed to delete post");
    }
  };

  return (
    <div>
      <Button asChild>
        <Link href="/appwrite/add">Add New</Link>
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 my-3 gap-1">
          {post.length > 0 ? (
            post.map((item, index) => (
              <Card key={index} className="group relative flex flex-col gap-3">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <div className="scale-0 group-hover:scale-100 origin-top-right transition absolute right-0 top-0 flex gap-1 p-2">
                  <Button asChild className="rounded-full" size="sm">
                    <Link href={`/fullstack/crud1/edit/${item.$id}`}>Edit</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item?.$id)}
                    type="button"
                    className="rounded-full"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p>post kosong</p>
          )}
        </div>
      )}
    </div>
  );
}
