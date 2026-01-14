import * as z from "zod";

export const drizzle = {
  DrizzleQueryError: z.object({
    name: z.string(),
    query: z.string(),
    message: z.string().optional(),
  }),
};
