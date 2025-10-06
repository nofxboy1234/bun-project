import { Kysely } from "kysely";
import type { DB } from "@/db";
import { SQL } from "bun";
import { PostgresJSDialect } from "kysely-postgres-js";

const dialect = new PostgresJSDialect({
  postgres: new SQL(Bun.env.DATABASE_URL!),
});

export const db = new Kysely<DB>({
  dialect,
});
