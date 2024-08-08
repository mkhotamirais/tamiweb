"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddCrud1({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("isi dulu");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/app/appwrite/api/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("gagal");
      }
      router.push("/fullstack/crud1");
    } catch (error) {
      setError("ada kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/fullstack/crud1/api/${params.id}`);
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const data = await response.json();
        setFormData({ title: data.post.title, description: data.post.description });
      } catch (error) {
        setError("failed to load post");
      }
    };
    fetchData();
  }, [params]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-3">Edit Data</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          id="title"
          name="title"
          value={formData?.title}
          className="w-full border p-2"
          placeholder="title"
          onChange={handleChange}
        />
        <textarea
          id="description"
          name="description"
          value={formData?.description}
          placeholder="description"
          onChange={handleChange}
          className="p-2 w-full h-64 border"
        />
        <button
          type="submit"
          aria-label="add"
          disabled={isLoading}
          className="border rounded p-2 hover:bg-black hover:text-white transition-all disabled:opacity-50"
        >
          {isLoading ? "loading..." : "update"}
        </button>
      </form>
    </div>
  );
}
