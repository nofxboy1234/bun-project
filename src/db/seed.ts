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
  characterAliases,
  contracts,
  relatives,
  characterAffiliations,
  characterOccupations,
} from "./seedData";
import type { TableData, Model, DBRow } from "@/types";
import { resetDB } from "@/db/resetDB";

const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamel = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1]!.toUpperCase());

const cleanModel = (model: Model): Model => {
  const entries = Object.entries(model)
    .filter(([key]) => key !== "id")
    .map(([key, value]) => [
      camelToSnake(key),
      (value as () => string | number | null)(),
    ]);
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

const insertCleanModels = async (
  tableName: string,
  cleanModels: Model[],
): Promise<DBRow[]> =>
  await sql`
        INSERT INTO ${sql(tableName)} ${sql(cleanModels)}
        ON CONFLICT DO NOTHING
        RETURNING *
      `;

const seed = async (table: TableData) => {
  const models = table.data;
  const cleanModels = models.map(cleanModel);
  const rows = await insertCleanModels(table.table, cleanModels);

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
    characterAliases,
    contracts,
    relatives,
    characterAffiliations,
    characterOccupations,
  ];

  for (const table of tablesToSeed) {
    await seed(table);
  }
  console.log("Database seeded successfully!");

  process.exit();
};

main();
