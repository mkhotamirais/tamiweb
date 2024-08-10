"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
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
    if (!formData.name || !formData.description) {
      setError("isi dulu");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios.patch(`/appwrite-text/api/${params.id}`, formData);
      router.push("/appwrite-text");
    } catch (error) {
      setError("ada kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appwrite-text/api/${params.id}`);
        const { name, description } = response.data.response;
        setFormData({ name, description });
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
          id="name"
          name="name"
          value={formData?.name}
          className="w-full border p-2"
          placeholder="name"
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
