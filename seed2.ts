import { sql } from "bun";
import {
  statuses,
  // characters,
  // genders,
  // locationTypes,
  // locations,
  // species,
} from "./seedData";
import type { StatusSelectModel, TableData } from "@/types";

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

  const records = await sql<StatusSelectModel[]>`
          INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
          ON CONFLICT DO NOTHING
          RETURNING *
          `;

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

const main = () => {
  // [statuses, genders, species, locationTypes, locations, characters].forEach(
  //   (table) => seed(table),
  // );
  [statuses].forEach((table) => seed(table));
};

main();
