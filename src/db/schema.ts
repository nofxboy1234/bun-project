import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const statusesTable = pgTable("statuses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
