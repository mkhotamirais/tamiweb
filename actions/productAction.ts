"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { ProductSchema } from "@/schemas/productSchema";
import { revalidatePath } from "next/cache";

export const getProducts = async (q?: string) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await db.product.findMany({ where: { name: { contains: q, mode: "insensitive" } } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getProductByName = async (name: string) => {
  try {
    const data = await db.product.findFirst({ where: { name } });
    return data;
  } catch (error) {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const data = await db.product.findUnique({ where: { id } });
    return data;
  } catch (error) {
    return null;
  }
};

export const addProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { name, price } = validatedFields.data;

  const existingProduct = await getProductByName(name);
  if (existingProduct) return { error: "Nama produk sudah terdaftar" };

  await db.product.create({ data: { name, price } });
  revalidatePath("/product");

  return { success: "Produk berhasil ditambahkan" };
};

export const deleteProduct = async (id: string) => {
  const data = await getProductById(id);
  if (!data) return { error: "Data tidak ditemukan" };
  try {
    await db.product.delete({ where: { id } });
    revalidatePath("/product");
    return { success: "Data berhasil dihapus" };
  } catch (error) {
    return { error: "Data gagal dihapus" };
  }
};

export const editProduct = async (id: string, values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
  const { name, price } = validatedFields.data;

  const existingData = await getProductById(id);
  if (!existingData) return { error: "Data tidak ditemukan" };

  const existingName = await getProductByName(name);
  if (existingName && existingName.name !== name) return { error: "Nama produk sudah terdaftar" };

  try {
    await db.product.update({ where: { id }, data: { name, price } });
    revalidatePath("/product");

    return { success: "Data berhasil diupdate" };
  } catch (error) {
    return { error: "Data gagal diupdate" };
  }
};
