import { sql } from "bun";
import {
  statuses,
  characters,
  genders,
  locationTypes,
  locations,
  species,
  relativeTypes,
  affiliations,
  occupations,
  speciesAliases,
  maps,
} from "./seedData";
import type {
  TableData,
  StatusSelectModel,
  GenderSelectModel,
  SpeciesSelectModel,
  LocationSelectModel,
  CharacterSelectModel,
  LocationTypeSelectModel,
  RelativeTypeSelectModel,
  AffiliationSelectModel,
  OccupationSelectModel,
  SpeciesAliasSelectModel,
  MapSelectModel,
  Model,
  DBRow,
} from "@/types";
import { resetDB } from "resetDB";

const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamel = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1]!.toUpperCase());

const cleanModel = (model: object) => {
  const entries = Object.entries(model)
    .filter(([key]) => key !== "id")
    .map(([key, value]) => [camelToSnake(key), value()]);
  return Object.fromEntries(entries);
};

const cleanRow = (row: DBRow): DBRow => {
  const entries = Object.entries(row).map(([key, value]) => [
    snakeToCamel(key),
    value,
  ]);
  return Object.fromEntries(entries);
};

const updateModelIds = (models: Model[], rows: DBRow[]) => {
  models.forEach((model) => {
    const idRow = rows.map(cleanRow).find((row) =>
      Object.entries(model)
        .filter(([key]) => key !== "id")
        .every(
          ([key, value]) =>
            (value as () => string | number | null)() ===
            (row as Record<string, unknown>)[key],
        ),
    );

    model.id = idRow!.id;
  });
};

const seed = async (table: TableData) => {
  const models = table.data;
  const cleanModels = models.map(cleanModel);

  let rows: DBRow[] = [];

  switch (table.table) {
    case "statuses":
      rows = await sql<StatusSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "location_types":
      rows = await sql<LocationTypeSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "genders":
      rows = await sql<GenderSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "species":
      rows = await sql<SpeciesSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "relative_types":
      rows = await sql<RelativeTypeSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "affiliations":
      rows = await sql<AffiliationSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "occupations":
      rows = await sql<OccupationSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "locations":
      rows = await sql<LocationSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "species_aliases":
      rows = await sql<SpeciesAliasSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "maps":
      rows = await sql<MapSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
    case "characters":
      rows = await sql<CharacterSelectModel[]>`
        INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;
      break;
  }

  updateModelIds(models, rows);
};

const main = async () => {
  await resetDB();

  const tablesToSeed = [
    statuses,
    locationTypes,
    genders,
    species,
    relativeTypes,
    affiliations,
    occupations,
    locations,
    speciesAliases,
    maps,
    characters,
  ];

  for (const table of tablesToSeed) {
    await seed(table);
  }
  console.log("Database seeded successfully!");

  process.exit();
};

main();
