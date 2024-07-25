import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, {
    message: "product name is required",
  }),
  price: z.coerce.number().min(100, {
    message: "price must be at least 3 digits",
  }),
});
