import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, index } from "drizzle-orm/pg-core";

export const statuses = pgTable("statuses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationTypes = pgTable("location_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationTypesRelations = relations(locationTypes, ({ many }) => ({
  locations: many(locations),
}));

export const locations = pgTable(
  "locations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    locationTypeId: integer().references(() => locationTypes.id),
  },
  (table) => [index("location_type_id_idx").on(table.locationTypeId)],
);

export const locationsRelations = relations(locations, ({ one }) => ({
  locationType: one(locationTypes, {
    fields: [locations.locationTypeId],
    references: [locationTypes.id],
  }),
}));
