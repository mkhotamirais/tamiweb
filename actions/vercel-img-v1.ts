"use server";

import { ImgV1Schema } from "@/app/(crud)/vercel-img-v1/_components/schemas";
import { db } from "@/lib/db";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addImage(prevState: any, formData: FormData) {
  try {
    const res = Object.fromEntries(formData.entries());
    const validatedFields = ImgV1Schema.safeParse(res);

    if (!validatedFields.success) {
      const { name, image } = validatedFields.error.flatten().fieldErrors;
      return { errors: { name: name?.[0], image: image?.[0] } };
    }

    const { name, image } = validatedFields.data;

    const existingName = await db.imgV1.findFirst({ where: { name } });
    if (existingName) return { error: `${name} sudah ada, gunakan nama lain` };

    const url =
      image && image.size > 0 ? (await put(image.name, image, { access: "public", multipart: true })).url : null;

    await db.imgV1.create({ data: { name, image: url } });
  } catch (error: any) {
    return { error: "something went wrong" };
  }
  revalidatePath("/vercel-img-v1");
  redirect("/vercel-img-v1");
}

export async function getImages() {
  try {
    const res = await db.imgV1.findMany();
    return res;
  } catch (error) {
    return null;
  }
}

export async function getImageById(id: string) {
  try {
    const res = await db.imgV1.findUnique({ where: { id } });
    return res;
  } catch (error) {
    return null;
  }
}

export async function deleteImage(id: string) {
  const data = await getImageById(id);
  if (!data) return { message: "no data found" };

  if (data?.image) {
    await del(data.image);
  }

  try {
    await db.imgV1.delete({ where: { id } });
  } catch (error: any) {
    return { error: error.message };
  }
  revalidatePath("/vercel-img-v1");
}

export async function editImage(id: string, prevState: any, formData: FormData) {
  try {
    const res = Object.fromEntries(formData.entries());
    const validatedFields = ImgV1Schema.safeParse(res);

    if (!validatedFields.success) {
      const { name, image } = validatedFields.error.flatten().fieldErrors;
      return { errors: { name: name?.[0], image: image?.[0] } };
    }

    const { name, image } = validatedFields.data;

    const singleImage = await getImageById(id);
    const existingName = await db.imgV1.findFirst({ where: { name } });

    if (existingName && existingName.name !== singleImage?.name)
      return { error: `${name} sudah ada, gunakan nama lain` };

    let imagePath;
    if (!image || image.size <= 0) {
      imagePath = singleImage?.image;
    } else {
      if (singleImage?.image) {
        await del(singleImage?.image);
      }
      const { url } = await put(image.name, image, { access: "public", multipart: true });
      imagePath = url;
    }
    await db.imgV1.update({ where: { id }, data: { name, image: imagePath } });
  } catch (error: any) {
    return { error: "something went wrong" };
  }
  revalidatePath("/vercel-img-v1");
  redirect("/vercel-img-v1");
}
