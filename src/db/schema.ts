import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  index,
  timestamp,
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";

// import {} from ''

export const statuses = pgTable(
  "statuses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("statuses_name_idx").on(t.name)],
);

export const statusesRelations = relations(statuses, ({ many }) => ({
  characters: many(characters),
}));

export const locationTypes = pgTable(
  "location_types",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("location_types_name_idx").on(t.name)],
);

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
  (t) => [
    uniqueIndex("locations_name_idx").on(t.name),
    index("location_type_id_idx").on(t.locationTypeId),
  ],
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
  (t) => [
    uniqueIndex("character_aliases_name_characterId_idx").on(
      t.name,
      t.characterId,
    ),
    index("character_aliases_character_id_idx").on(t.characterId),
  ],
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

export const genders = pgTable(
  "genders",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("genders_name_idx").on(t.name)],
);

export const gendersRelations = relations(genders, ({ many }) => ({
  characters: many(characters),
}));

export const speciesAliases = pgTable(
  "species_aliases",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
    speciesId: integer()
      .references(() => species.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [
    uniqueIndex("species_aliases_name_idx").on(t.name),
    index("species_aliases_species_id_idx").on(t.speciesId),
  ],
);

export const speciesAliasesRelations = relations(speciesAliases, ({ one }) => ({
  species: one(species, {
    fields: [speciesAliases.speciesId],
    references: [species.id],
  }),
}));

export const species = pgTable(
  "species",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 2000 }),
  },
  (t) => [uniqueIndex("species_name_idx").on(t.name)],
);

export const speciesRelations = relations(species, ({ many }) => ({
  speciesAliases: many(speciesAliases),
  characters: many(characters),
}));

export const maps = pgTable(
  "maps",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    imageFilePath: varchar({ length: 255 }).notNull(),
    locationId: integer()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [uniqueIndex("maps_location_id_idx").on(t.locationId)],
);

export const mapsRelations = relations(maps, ({ one }) => ({
  location: one(locations, {
    fields: [maps.locationId],
    references: [locations.id],
  }),
}));

export const relativeTypes = pgTable(
  "relative_types",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("relative_types_name_idx").on(t.name)],
);

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
  (t) => [
    uniqueIndex("relatives_character1Id_character2Id_idx").on(
      t.character1Id,
      t.character2Id,
    ),
    index("relatives_character1_id_idx").on(t.character1Id),
    index("relatives_character2_id_idx").on(t.character2Id),
    index("relatives_relative_type_id_idx").on(t.relativeTypeId),
  ],
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
    uniqueIndex("contracts_humanId_devilId_idx").on(t.humanId, t.devilId),
    index("contracts_human_id_idx").on(t.humanId),
    index("contracts_devil_id_idx").on(t.devilId),
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

export const characters = pgTable(
  "characters",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
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
  },
  (t) => [
    uniqueIndex("characters_name_idx").on(t.name),
    index("characters_species_id_idx").on(t.speciesId),
    index("characters_gender_id_idx").on(t.genderId),
    index("characters_birthplace_id_idx").on(t.birthplaceId),
    index("characters_status_id_idx").on(t.statusId),
  ],
);

export const charactersRelations = relations(characters, ({ one, many }) => ({
  characterAliases: many(characterAliases),
  characterOccupations: many(characterOccupations),
  characterAffiliations: many(characterAffiliations),
  contractsAsHuman: many(contracts, { relationName: "human" }),
  contractsAsDevil: many(contracts, { relationName: "devil" }),
  relatives: many(relatives, { relationName: "character1" }),
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
  (t) => [
    uniqueIndex("character_affiliations_characterId_affiliationId_idx").on(
      t.characterId,
      t.affiliationId,
    ),
    index("character_affiliations_character_id_idx").on(t.characterId),
    index("character_affiliations_affiliation_id_idx").on(t.affiliationId),
  ],
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

export const affiliations = pgTable(
  "affiliations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("affiliations_name_idx").on(t.name)],
);

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
  (t) => [
    uniqueIndex("character_occupations_characterId_occupationId_idx").on(
      t.characterId,
      t.occupationId,
    ),
    index("character_occupations_character_id_idx").on(t.characterId),
    index("character_occupations_occupation_id_idx").on(t.occupationId),
  ],
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

export const occupations = pgTable(
  "occupations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow(),
    name: varchar({ length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("occupations_name_idx").on(t.name)],
);

export const occupationsRelations = relations(occupations, ({ many }) => ({
  characterOccupations: many(characterOccupations),
}));
