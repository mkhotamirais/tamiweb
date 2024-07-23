"use server";

import { del, put } from "@vercel/blob";
import { db } from "@/lib/db";
import { ContactSchema } from "@/schemas/contactSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const ITEMS_PER_PAGE = 8;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const contacts = await db.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }, { phone: { contains: query, mode: "insensitive" } }],
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("Failed to catch contact data");
  }
};

export const getContactPages = async (query: string) => {
  try {
    const contacts = await db.contact.count({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }, { phone: { contains: query, mode: "insensitive" } }],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to catch contact data");
  }
};

export const getContactById = async (id: string) => {
  try {
    const contact = await db.contact.findUnique({ where: { id } });
    return contact;
  } catch (error) {
    throw new Error("Failed to catch contact data");
  }
};

export const addContact = async (prevState: any, formData: FormData) => {
  try {
    // const data = Object.fromEntries(formData.entries());
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      const { name, phone, image } = validatedFields.error.flatten().fieldErrors;
      return { name, phone, image };
    }
    const { name, phone, image } = validatedFields.data;
    const { url } = await put(image.name, image, { access: "public", multipart: true });
    await db.contact.create({ data: { name, phone, image: url } });
  } catch (error) {
    return { error: "failed to create contact" };
  }
  revalidatePath("/contact-app");
  redirect("/contact-app");
};

export const editContact = async (id: string, prevState: any, formData: FormData) => {
  const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    const { name, phone, image } = validatedFields.error.flatten().fieldErrors;
    return { name, phone, image };
  }
  const data = await getContactById(id);
  if (!data) return { message: "no data found" };
  const { name, phone, image } = validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, { access: "public", multipart: true });
    imagePath = url;
  }

  try {
    await db.contact.update({ data: { name, phone, image: imagePath }, where: { id } });
  } catch (error) {
    return { error: "failed to update contact" };
  }
  revalidatePath("/contact-app");
  redirect("/contact-app");
};

export const deleteContact = async (id: string) => {
  const data = await getContactById(id);
  if (!data) return { message: "no data found" };
  await del(data.image);
  try {
    await db.contact.delete({ where: { id } });
  } catch (error) {
    return { error: "failed to delete contact" };
  }
  revalidatePath("/contact-app");
};
