import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  index,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const statuses = pgTable("statuses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationTypes = pgTable("location_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationTypesRelations = relations(locationTypes, ({ many }) => ({
  locations: many(locations),
}));

export const locations = pgTable(
  "locations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
    locationTypeId: integer()
      .references(() => locationTypes.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [index("location_type_id_idx").on(table.locationTypeId)],
);

export const locationsRelations = relations(locations, ({ one }) => ({
  locationType: one(locationTypes, {
    fields: [locations.locationTypeId],
    references: [locationTypes.id],
  }),
}));

export const characterAliases = pgTable("character_aliases", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const genders = pgTable("genders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const speciesAliases = pgTable("species_aliases", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const species = pgTable("species", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
});

export const maps = pgTable("maps", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  imageFilePath: varchar({ length: 255 }).notNull(),
});

export const relatives = pgTable("relatives", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  type: varchar({ length: 255 }).notNull(),
});

export const contracts = pgTable("contracts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  terms: varchar({ length: 255 }).notNull(),
});

export const characters = pgTable("characters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
  age: integer(),
  height: integer(),
  birthday: date(),
});

export const characterAffiliations = pgTable("character_affiliations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
});

export const affiliations = pgTable("affiliations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});

export const character_occupations = pgTable("character_occupations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
});

export const occupations = pgTable("occupations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
});
