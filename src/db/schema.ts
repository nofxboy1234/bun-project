import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  index,
  timestamp,
  date,
  unique,
  check,
} from "drizzle-orm/pg-core";

export const statuses = pgTable("statuses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const statusesRelations = relations(statuses, ({ many }) => ({
  characters: many(characters),
}));

export const locationTypes = pgTable("location_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const locationTypesRelations = relations(locationTypes, ({ many }) => ({
  locations: many(locations),
}));

export const locations = pgTable(
  "locations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull().unique(),
    locationTypeId: integer()
      .references(() => locationTypes.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [index("location_type_id_idx").on(t.locationTypeId)],
);

export const locationsRelations = relations(locations, ({ one, many }) => ({
  locationType: one(locationTypes, {
    fields: [locations.locationTypeId],
    references: [locationTypes.id],
  }),
  characters: many(characters),
  map: one(maps),
}));

export const characterAliases = pgTable(
  "character_aliases",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
    characterId: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [unique().on(t.characterId, t.name)],
);

export const characterAliasesRelations = relations(
  characterAliases,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterAliases.characterId],
      references: [characters.id],
    }),
  }),
);

export const genders = pgTable("genders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const gendersRelations = relations(genders, ({ many }) => ({
  characters: many(characters),
}));

export const speciesAliases = pgTable("species_aliases", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
  speciesId: integer()
    .references(() => species.id, { onDelete: "cascade" })
    .notNull(),
});

export const speciesAliasesRelations = relations(speciesAliases, ({ one }) => ({
  species: one(species, {
    fields: [speciesAliases.speciesId],
    references: [species.id],
  }),
}));

export const species = pgTable("species", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 2000 }),
});

export const speciesRelations = relations(species, ({ one, many }) => ({
  speciesAliases: many(speciesAliases),
  characters: many(characters),
}));

export const maps = pgTable("maps", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  imageFilePath: varchar({ length: 255 }).notNull(),
  locationId: integer()
    .references(() => locations.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
});

export const mapsRelations = relations(maps, ({ one }) => ({
  location: one(locations, {
    fields: [maps.locationId],
    references: [locations.id],
  }),
}));

export const relativeTypes = pgTable("relative_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const relativeTypesRelations = relations(relativeTypes, ({ many }) => ({
  relatives: many(relatives),
}));

export const relatives = pgTable(
  "relatives",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    character1Id: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    character2Id: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    relativeTypeId: integer()
      .references(() => relativeTypes.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [unique().on(t.character1Id, t.character2Id)],
);

export const relativesRelations = relations(relatives, ({ one }) => ({
  character1: one(characters, {
    fields: [relatives.character1Id],
    references: [characters.id],
    relationName: "character1",
  }),
  character2: one(characters, {
    fields: [relatives.character2Id],
    references: [characters.id],
    relationName: "character2",
  }),
  relativeType: one(relativeTypes, {
    fields: [relatives.relativeTypeId],
    references: [relativeTypes.id],
  }),
}));

export const contracts = pgTable(
  "contracts",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    terms: varchar({ length: 2000 }).notNull(),
    humanId: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    devilId: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [
    check("no_self_contract", sql`${t.humanId} <> ${t.devilId}`),
    unique().on(t.humanId, t.devilId),
  ],
);

export const contractsRelations = relations(contracts, ({ one }) => ({
  human: one(characters, {
    fields: [contracts.humanId],
    references: [characters.id],
    relationName: "human",
  }),
  devil: one(characters, {
    fields: [contracts.devilId],
    references: [characters.id],
    relationName: "devil",
  }),
}));

export const characters = pgTable("characters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
  age: integer(),
  height: integer(),
  speciesId: integer()
    .references(() => species.id, { onDelete: "cascade" })
    .notNull(),
  genderId: integer()
    .references(() => genders.id, { onDelete: "cascade" })
    .notNull(),
  birthplaceId: integer()
    .references(() => locations.id, { onDelete: "cascade" })
    .notNull(),
  statusId: integer()
    .references(() => statuses.id, { onDelete: "cascade" })
    .notNull(),
});

export const charactersRelations = relations(characters, ({ one, many }) => ({
  characterAliases: many(characterAliases),
  characterOccupations: many(characterOccupations),
  characterAffiliations: many(characterAffiliations),
  contractsAsHuman: many(contracts, { relationName: "human" }),
  contractsAsDevil: many(contracts, { relationName: "devil" }),
  relativesAsCharacter1: many(relatives, { relationName: "character1" }),
  relativesAsCharacter2: many(relatives, { relationName: "character2" }),
  species: one(species, {
    fields: [characters.speciesId],
    references: [species.id],
  }),
  gender: one(genders, {
    fields: [characters.genderId],
    references: [genders.id],
  }),
  birthplace: one(locations, {
    fields: [characters.birthplaceId],
    references: [locations.id],
  }),
  status: one(statuses, {
    fields: [characters.statusId],
    references: [statuses.id],
  }),
}));

export const characterAffiliations = pgTable(
  "character_affiliations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    characterId: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    affiliationId: integer()
      .references(() => affiliations.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [unique().on(t.characterId, t.affiliationId)],
);

export const characterAffiliationsRelations = relations(
  characterAffiliations,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterAffiliations.characterId],
      references: [characters.id],
    }),
    affiliation: one(affiliations, {
      fields: [characterAffiliations.affiliationId],
      references: [affiliations.id],
    }),
  }),
);

export const affiliations = pgTable("affiliations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const affiliationsRelations = relations(affiliations, ({ many }) => ({
  characterAffiliations: many(characterAffiliations),
}));

export const characterOccupations = pgTable(
  "character_occupations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    characterId: integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    occupationId: integer()
      .references(() => occupations.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [unique().on(t.characterId, t.occupationId)],
);

export const characterOccupationsRelations = relations(
  characterOccupations,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterOccupations.characterId],
      references: [characters.id],
    }),
    occupation: one(occupations, {
      fields: [characterOccupations.occupationId],
      references: [occupations.id],
    }),
  }),
);

export const occupations = pgTable("occupations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const occupationsRelations = relations(occupations, ({ many }) => ({
  characterOccupations: many(characterOccupations),
}));
