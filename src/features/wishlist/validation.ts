import { z } from "zod";

export const createWatchlistSchema = z.object({
  name: z
    .string()
    .min(2, "Watchlist name must be at least 2 characters"),
});

export type CreateWatchlistData = z.infer<typeof createWatchlistSchema>;
