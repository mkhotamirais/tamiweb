"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { TextSchema } from "@/app/(crud)/vercel-text/_components/schemas";

const limit = 7;

export async function postText(values: z.infer<typeof TextSchema>) {
  try {
    const validatedFields = TextSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title, description } = validatedFields.data;

    const existingTitle = await getTextByTitle(title);
    if (existingTitle) return { error: "Duplicate title, use another title!" };

    const result = await db.text.create({ data: { title, description } });
    return { success: `Post ${title} success`, data: result };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}

// where: {
//   OR: [{ name: { contains: query, mode: "insensitive" } }, { phone: { contains: query, mode: "insensitive" } }],
// },
export async function getTexts(q: string, currentPage: number) {
  const offset = (currentPage - 1) * limit;
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await db.text.findMany({
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

export async function getTextsPerPage(q: string) {
  try {
    const data = await db.text.count({ where: { title: { contains: q, mode: "insensitive" } } });
    const totalPages = Math.ceil(Number(data) / limit);
    return totalPages;
  } catch (error) {
    return null;
  }
}

export async function getTextById(id: string) {
  try {
    const data = await db.text.findUnique({ where: { id } });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getTextByTitle(title: string) {
  try {
    const data = await db.text.findFirst({ where: { title } });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteText(id: string) {
  try {
    const existingText = await getTextById(id);
    if (!existingText) return { error: "Text not found!" };
    await db.text.delete({ where: { id } });
    return { success: `Delete ${existingText.title} success` };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}

export async function updateText(id: string | undefined, values: z.infer<typeof TextSchema>) {
  try {
    if (!id) return { error: "Product id is required" };

    const validatedFields = TextSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title, description } = validatedFields.data;

    const existingText = await getTextById(id);
    if (!existingText) return { error: "Text not found" };

    const existingTitle = await getTextByTitle(title);
    if (existingTitle && existingTitle.title !== title) return { error: "Duplicate title, use another title!" };

    const result = await db.text.update({ data: { title, description }, where: { id } });
    return { success: `Update ${title} success`, data: result };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message || "something went wrong" };
  }
}
