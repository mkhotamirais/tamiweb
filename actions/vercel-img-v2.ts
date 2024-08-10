"use server";

import { ImgV2Schema } from "@/app/(crud)/vercel-img-v2/_components/schemas";
import { z } from "zod";

export async function postImageV2(values: z.infer<typeof ImgV2Schema>) {
  try {
    // const res = await db.imgV2.create({data: {name: "ahmad",}})
  } catch (error: any) {
    return { error: error?.message };
  }
}
