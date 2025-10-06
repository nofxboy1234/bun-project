import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "@/db";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: Bun.env.DATABASE_URL,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
