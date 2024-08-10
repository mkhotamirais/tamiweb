"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

type TText = {
  $id: string;
  name: string;
  description: string;
};

export default function AppwriteTextPage() {
  const [text, setText] = useState<TText[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      setIsLoading(true);
      await axios
        .get("/appwrite-text/api")
        .then((res) => {
          setText(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchText();
  }, []);

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await axios.delete(`/appwrite-text/api/${id}`);
      setText((prev) => prev?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("failed to delete text");
    }
  };

  return (
    <div>
      <Button asChild>
        <Link href="/appwrite-text/add">Add New</Link>
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 my-3 gap-1">
          {text.length > 0 ? (
            text.map((item, index) => (
              <Card key={index} className="group relative flex flex-col gap-3">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <div className="scale-0 group-hover:scale-100 origin-top-right transition absolute right-0 top-0 flex gap-1 p-2">
                  <Button asChild className="rounded-full" size="sm">
                    <Link href={`/appwrite-text/edit/${item.$id}`}>Edit</Link>
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
            <p>text kosong</p>
          )}
        </div>
      )}
    </div>
  );
}
