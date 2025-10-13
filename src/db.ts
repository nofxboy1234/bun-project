import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "@/db/schema";

export const db = drizzle(Bun.env.DATABASE_URL!, {
  casing: "snake_case",
  schema,
});
