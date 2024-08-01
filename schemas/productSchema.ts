import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, {
    message: "product name is required",
  }),
  price: z.coerce.number().min(100, {
    message: "price must be at least 3 digits",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "only images are allowed" })
    .refine((file) => file.size < 2000000, { message: "image must less than 2mb" })
    .optional(),
});
