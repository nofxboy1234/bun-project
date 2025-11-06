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
} from "@/types";
import { createSeedClient } from "@snaplet/seed";

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

const cleanRecord = (record: object) => {
  const entries = Object.entries(record).map(([key, value]) => [
    snakeToCamel(key),
    value,
  ]);
  return Object.fromEntries(entries);
};

const seed = async (table: TableData) => {
  const models = table.data;
  const cleanModels = models.map(cleanModel);

  let records: Array<
    | StatusSelectModel
    | CharacterSelectModel
    | GenderSelectModel
    | LocationSelectModel
    | LocationTypeSelectModel
    | SpeciesSelectModel
    | RelativeTypeSelectModel
    | AffiliationSelectModel
    | OccupationSelectModel
  >;

  switch (table.table) {
    case "statuses":
      records = await sql<StatusSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "characters":
      records = await sql<CharacterSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "genders":
      records = await sql<GenderSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "location_types":
      records = await sql<LocationTypeSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "locations":
      records = await sql<LocationSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "species":
      records = await sql<SpeciesSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "relative_types":
      records = await sql<RelativeTypeSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "affiliations":
      records = await sql<AffiliationSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
    case "occupations":
      records = await sql<OccupationSelectModel[]>`
              INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
              ON CONFLICT DO NOTHING
              RETURNING *
              `;
      break;
  }

  models.forEach((model) => {
    const idRecord = records.map(cleanRecord).find((record) =>
      Object.entries(model)
        .filter(([key]) => key !== "id")
        .every(
          ([key, value]) =>
            (value as () => string | number | null)() ===
            (record as Record<string, unknown>)[key],
        ),
    );

    model.id = idRecord.id;
  });
};

const main = async () => {
  const baseClient = await createSeedClient();
  await baseClient.$resetDatabase();
  console.log("Database reset successfully!");

  const tablesToSeed = [
    statuses,
    locationTypes,
    genders,
    species,
    relativeTypes,
    affiliations,
    occupations,
    locations,
    characters,
  ];

  for (const table of tablesToSeed) {
    await seed(table);
  }
  console.log("Database seeded successfully!");

  process.exit();
};

main();
