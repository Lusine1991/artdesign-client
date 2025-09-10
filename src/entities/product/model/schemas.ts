import z from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  type: z.string(),
  color: z.string(),
  size: z.string(),
  print: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  isPublic: z.boolean(),
});
