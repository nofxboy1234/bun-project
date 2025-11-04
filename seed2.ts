import { sql } from "bun";
import {
  characters,
  genders,
  locationTypes,
  locations,
  locationsData,
  species,
  statuses,
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

const seed = async (table: TableData) => {
  const cleanModels = table.data.map(cleanModel);

  const records = await sql<StatusSelectModel[]>`
          INSERT INTO ${sql(table.table)} ${sql(cleanModels)}
          ON CONFLICT DO NOTHING
          RETURNING *
        `;
};

const main = () => {
  [statuses, genders, species, locationTypes, locations, characters].forEach(
    (table) => seed(table),
  );
};

main();
