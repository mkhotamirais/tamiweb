import { z } from "zod";

export const ImgV1Schema = z.object({
  name: z.string().min(1, { message: "name required" }),
  image: z
    .instanceof(File)
    // .refine((file) => file.size > 0, { message: "image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "only images are allowed" })
    .refine((file) => file.size < 2000000, { message: "image must less than 2mb" })
    .optional(),
});

// export const UploadImageSchema = z.object({
//   name: z.string().min(1, { message: "name required" }),
//   image: z
//     .instanceof(File)
//     .refine((file) => file.size > 0, { message: "image is required" })
//     .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "only images are allowed" })
//     .refine((file) => file.size < 2000000, { message: "image must less than 2mb" }),
//   // .optional(),
// });
