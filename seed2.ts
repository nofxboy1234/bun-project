import { sql } from "bun";
import { charactersData } from "./seedData";
import { charactersRelations } from "./src/db/schema";
import { getTableConfig } from "drizzle-orm/pg-core";

const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamel = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1]!.toUpperCase());

const relationEntries = (relations) =>
  Object.entries(relations)
    // Filter for 'one' relations, which are defined with a 'fields' property in their config.
    .filter(([, relation]) => !!relation.config?.fields?.length)
    .map(([relationName, relation]) => [
      relationName,
      getTableConfig(relation.referencedTable).name,
    ]);

const modelEntries = (model, relationToIdMap) =>
  Object.entries(model).map(([key, value]) => {
    if (Object.keys(relationToIdMap).includes(key)) {
      return [key + "_id", value];
    } else {
      return [key, value];
    }
  });

const seedDependencies = async (model, relationToTableMap, relationToIdMap) => {
  for (const key of Object.keys(relationToTableMap)) {
    const value = model[key as keyof typeof model];

    if (typeof value === "object" && value !== null) {
      const tableName = relationToTableMap[key];
      const [record] = await sql`
          insert into ${tableName} ${sql(value)}
          on conflict () do nothing
          returning *
        `;
      relationToIdMap[key] = record.id;
    }
  }
};

const seedCharacters = () => {
  const relationToTableMap = Object.fromEntries(
    relationEntries(charactersRelations),
  );

  charactersData.forEach(async (char) => {
    const relationToIdMap = { ...relationToTableMap };

    seedDependencies(char, relationToTableMap, relationToIdMap);

    Object.assign(char, relationToIdMap);

    const charEntries = modelEntries(char, relationToIdMap);
    const charWithIds = Object.fromEntries(charEntries);
    await sql`insert into characters ${sql(charWithIds)}`;
  });
};
