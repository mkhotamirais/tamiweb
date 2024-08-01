"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { ProductSchema } from "@/schemas/productSchema";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

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
  try {
    console.log(values);
    // const data = Object.fromEntries(formData.entries());
    // const validatedFields = ProductSchema.safeParse(Object.fromEntries(values.entries()));
    // if (!validatedFields.success) {
    //   const { name, price, image } = validatedFields.error.flatten().fieldErrors;
    //   return { name, price, image };
    // }
    // const { name, price, image } = validatedFields.data;
    // const url: any = image && (await put(image.name, image, { access: "public", multipart: true }));
    // await db.product.create({ data: { name, price, image: url } });
    // return { message: "berhasil", data };
  } catch (error) {
    return { error: "failed to create contact" };
  }
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
