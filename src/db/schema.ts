import { pgTable, index, uniqueIndex, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const statuses = pgTable(
  "statuses",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("statuses_name_idx").on(t.name)],
);

export const locationTypes = pgTable(
  "location_types",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("location_types_name_idx").on(t.name)],
);

export const locations = pgTable(
  "locations",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
    locationTypeId: t
      .integer()
      .references(() => locationTypes.id, {
        onDelete: "cascade",
      })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("locations_name_idx").on(t.name),
    index("location_type_id_idx").on(t.locationTypeId),
  ],
);

export const characterAliases = pgTable(
  "character_aliases",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
    characterId: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("character_aliases_name_characterId_idx").on(
      t.name,
      t.characterId,
    ),
    index("character_aliases_character_id_idx").on(t.characterId),
  ],
);

export const genders = pgTable(
  "genders",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("genders_name_idx").on(t.name)],
);

export const speciesAliases = pgTable(
  "species_aliases",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
    speciesId: t
      .integer()
      .references(() => species.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("species_aliases_name_idx").on(t.name),
    index("species_aliases_species_id_idx").on(t.speciesId),
  ],
);

export const species = pgTable(
  "species",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
    description: t.varchar({ length: 2000 }),
  }),
  (t) => [uniqueIndex("species_name_idx").on(t.name)],
);

export const maps = pgTable(
  "maps",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    imageFilePath: t.varchar({ length: 255 }).notNull(),
    locationId: t
      .integer()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [uniqueIndex("maps_location_id_idx").on(t.locationId)],
);

export const relativeTypes = pgTable(
  "relative_types",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("relative_types_name_idx").on(t.name)],
);

export const relatives = pgTable(
  "relatives",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    character1Id: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    character2Id: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    relativeTypeId: t
      .integer()
      .references(() => relativeTypes.id, {
        onDelete: "cascade",
      })
      .notNull(),
  }),
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

export const contracts = pgTable(
  "contracts",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    terms: t.varchar({ length: 2000 }).notNull(),
    humanId: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    devilId: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    check("no_self_contract", sql`${t.humanId} <> ${t.devilId}`),
    uniqueIndex("contracts_humanId_devilId_idx").on(t.humanId, t.devilId),
    index("contracts_human_id_idx").on(t.humanId),
    index("contracts_devil_id_idx").on(t.devilId),
  ],
);

export const characters = pgTable(
  "characters",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
    age: t.integer(),
    height: t.integer(),
    speciesId: t
      .integer()
      .references(() => species.id, { onDelete: "cascade" })
      .notNull(),
    genderId: t
      .integer()
      .references(() => genders.id, { onDelete: "cascade" })
      .notNull(),
    birthplaceId: t
      .integer()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
    statusId: t
      .integer()
      .references(() => statuses.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("characters_name_idx").on(t.name),
    index("characters_species_id_idx").on(t.speciesId),
    index("characters_gender_id_idx").on(t.genderId),
    index("characters_birthplace_id_idx").on(t.birthplaceId),
    index("characters_status_id_idx").on(t.statusId),
  ],
);

export const characterAffiliations = pgTable(
  "character_affiliations",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    characterId: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    affiliationId: t
      .integer()
      .references(() => affiliations.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("character_affiliations_characterId_affiliationId_idx").on(
      t.characterId,
      t.affiliationId,
    ),
    index("character_affiliations_character_id_idx").on(t.characterId),
    index("character_affiliations_affiliation_id_idx").on(t.affiliationId),
  ],
);

export const affiliations = pgTable(
  "affiliations",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("affiliations_name_idx").on(t.name)],
);

export const characterOccupations = pgTable(
  "character_occupations",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    characterId: t
      .integer()
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    occupationId: t
      .integer()
      .references(() => occupations.id, { onDelete: "cascade" })
      .notNull(),
  }),
  (t) => [
    uniqueIndex("character_occupations_characterId_occupationId_idx").on(
      t.characterId,
      t.occupationId,
    ),
    index("character_occupations_character_id_idx").on(t.characterId),
    index("character_occupations_occupation_id_idx").on(t.occupationId),
  ],
);

export const occupations = pgTable(
  "occupations",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: t.timestamp().defaultNow(),
    name: t.varchar({ length: 255 }).notNull(),
  }),
  (t) => [uniqueIndex("occupations_name_idx").on(t.name)],
);
