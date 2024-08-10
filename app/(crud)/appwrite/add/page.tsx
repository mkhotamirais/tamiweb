"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function AddCrud1() {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("isi dulu");
      return;
    }
    setError(null);
    setIsLoading(true);
    await axios
      .post("/app/appwrite/api", formData)
      .then((res) => {
        console.log(res);
        router.push("/fullstack/crud1");
      })
      .catch((err) => {
        console.log(err);
        throw new Error("gagal");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-3">Add Data</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          id="title"
          className="w-full border p-2"
          placeholder="title"
          onChange={handleChange}
        />
        <textarea
          name="description"
          id="description"
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
          {isLoading ? "loading..." : "add"}
        </button>
      </form>
    </div>
  );
}
