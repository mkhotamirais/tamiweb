"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { TeoriSchema } from "@/app/(crud)/vercel-text/_components/schemas";

const limit = 7;

export async function postTeori(values: z.infer<typeof TeoriSchema>) {
  try {
    const validatedFields = TeoriSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title, description } = validatedFields.data;

    const existingTitle = await getTeoriByTitle(title);
    if (existingTitle) return { error: "Duplicate title, use another title!" };

    const result = await db.teori.create({ data: { title, description } });
    return { success: `Post ${title} success`, data: result };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}

// where: {
//   OR: [{ name: { contains: query, mode: "insensitive" } }, { phone: { contains: query, mode: "insensitive" } }],
// },
export async function getTeoris(q: string, currentPage: number) {
  const offset = (currentPage - 1) * limit;
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await db.teori.findMany({
      skip: offset,
      take: limit,
      where: { title: { contains: q, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getTeorisPerPage(q: string) {
  try {
    const data = await db.teori.count({ where: { title: { contains: q, mode: "insensitive" } } });
    const totalPages = Math.ceil(Number(data) / limit);
    return totalPages;
  } catch (error) {
    return null;
  }
}

export async function getTeoriById(id: string) {
  try {
    const data = await db.teori.findUnique({ where: { id } });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getTeoriByTitle(title: string) {
  try {
    const data = await db.teori.findFirst({ where: { title } });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteTeori(id: string) {
  try {
    const existingTeori = await getTeoriById(id);
    if (!existingTeori) return { error: "Teori not found!" };
    await db.teori.delete({ where: { id } });
    return { success: `Delete ${existingTeori.title} success` };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}

export async function updateTeori(id: string | undefined, values: z.infer<typeof TeoriSchema>) {
  try {
    if (!id) return { error: "Product id is required" };

    const validatedFields = TeoriSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title, description } = validatedFields.data;

    const existingTeori = await getTeoriById(id);
    if (!existingTeori) return { error: "Teori not found" };

    const existingTitle = await getTeoriByTitle(title);
    if (existingTitle && existingTitle.title !== title) return { error: "Duplicate title, use another title!" };

    const result = await db.teori.update({ data: { title, description }, where: { id } });
    return { success: `Update ${title} success`, data: result };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}
