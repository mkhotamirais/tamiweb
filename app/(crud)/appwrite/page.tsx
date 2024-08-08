"use client";

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
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          {post.length > 0 ? (
            post.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mb-5">
                <h2 className="text-3xl font-semibold">{item.title}</h2>
                <p className="text-gray-500">{item.description}</p>
                <div className="flex gap-3">
                  <Link href={`/fullstack/crud1/edit/${item.$id}`} className="border rounded p-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item?.$id)}
                    type="button"
                    className="border rounded bg-red-500 text-white p-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>post kosong</p>
          )}
        </div>
      )}
    </>
  );
}
