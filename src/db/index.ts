import { drizzle } from "drizzle-orm/bun-sql";
import { relations } from "@/db/relations";

export const db = drizzle(Bun.env.DATABASE_URL!, {
  casing: "snake_case",
  relations,
});
