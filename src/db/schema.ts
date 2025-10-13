import { pgTable, integer, varchar, index } from "drizzle-orm/pg-core";

export const statusesTable = pgTable("statuses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationsTable = pgTable(
  "locations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    locationTypeId: integer().references(() => locationTypesTable.id),
  },
  (table) => [index("location_type_id_idx").on(table.locationTypeId)],
);

export const locationTypesTable = pgTable("location_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
