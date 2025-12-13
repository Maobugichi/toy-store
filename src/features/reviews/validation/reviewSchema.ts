import { z } from "zod";

export const reviewSchema = z.object({
  username: z.string().min(1, "Username required"),
  review: z.string().min(5, "Review must be at least 5 characters"),
  stars: z.number().min(1).max(5),
  product_id: z.number().min(1, "Product ID is required"),
});