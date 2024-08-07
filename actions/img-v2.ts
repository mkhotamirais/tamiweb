"use server";

import { ImgV2Schema } from "@/app/(crud)/img-v2/_components/schemas";
import { db } from "@/lib/db";
import { z } from "zod";

export async function postImageV2(values: z.infer<typeof ImgV2Schema>) {
  try {
    console.log(values);
    // const res = await db.imgV2.create({data: {name: "ahmad",}})
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
}
