import { getTableName } from "drizzle-orm";
import { PgTable, getTableConfig } from "drizzle-orm/pg-core";

import {
  species as speciesTable,
  genders as gendersTable,
  locationTypes as locationTypesTable,
  locations as locationsTable,
  statuses as statusesTable,
  characters as charactersTable,
} from "@/db/schema";

import type { TableData } from "@/types";

// const getIndexes = (table: PgTable) => {
//   const tableConfig = getTableConfig(table);
//   return tableConfig;
// };

// const locationsTableConfig = getIndexes(locationsTable);
// locationsTableConfig.indexes[0].config.name;
// locationsTableConfig.foreignKeys[0].reference().foreignTable

const statusesData = [
  { id: null, name: () => "Alive" },
  { id: null, name: () => "Deceased" },
  { id: null, name: () => "Reincarnated" },
];
export const statuses: TableData = {
  table: getTableName(statusesTable),
  data: statusesData,
};

const gendersData = [
  { id: null, name: () => "Male" },
  { id: null, name: () => "Female" },
  { id: null, name: () => "Unknown" },
];
export const genders = {
  table: getTableName(gendersTable),
  data: gendersData,
};

const speciesData = [
  { id: null, name: () => "Human", description: () => null },
  {
    id: null,
    name: () => "Devil",
    description: () => "Supernatural creatures born from human concepts",
  },
  {
    id: null,
    name: () => "Fiend",
    description: () => "Devils that possess corpses.",
  },
  {
    id: null,
    name: () => "Hybrid",
    description: () =>
      "Humans who have merged with and can take on the form of a Devil.",
  },
];
export const species = {
  table: getTableName(speciesTable),
  data: speciesData,
};

const locationTypesData = [
  { id: null, name: () => "Country" },
  { id: null, name: () => "City" },
  { id: null, name: () => "Church" },
  { id: null, name: () => "High School" },
  { id: null, name: () => "Restaurant" },
  { id: null, name: () => "Detention Center" },
  { id: null, name: () => "World" },
];
export const locationTypes = {
  table: getTableName(locationTypesTable),
  data: locationTypesData,
};

export const locationsData = [
  {
    id: null,
    name: () => "Japan",
    locationTypeId: () =>
      locationTypesData.find((obj) => obj.name() === "City")!.id,
  },
  {
    id: null,
    name: () => "Hell",
    locationTypeId: () =>
      locationTypesData.find((obj) => obj.name() === "World")!.id,
  },
];
export const locations = {
  table: getTableName(locationsTable),
  data: locationsData,
};

const charactersData = [
  {
    id: null,
    name: () => "Denji",
    age: () => 18,
    height: () => 173,
    speciesId: () => speciesData.find((obj) => obj.name() === "Human")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Male")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Japan")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
  {
    id: null,
    name: () => "Pochita",
    age: () => null,
    height: () => null,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Male")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Hell")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
  {
    id: null,
    name: () => "Makima",
    age: () => null,
    height: () => 168,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Female")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Japan")!.id,
    statusId: () =>
      statusesData.find((obj) => obj.name() === "Reincarnated")!.id,
  },
  {
    id: null,
    name: () => "Power",
    age: () => null,
    height: () => 170,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Female")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Japan")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Deceased")!.id,
  },
  {
    id: null,
    name: () => "Aki Hayakawa",
    age: () => null,
    height: () => 182,
    speciesId: () => speciesData.find((obj) => obj.name() === "Human")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Male")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Japan")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Deceased")!.id,
  },
  {
    id: null,
    name: () => "Future Devil",
    age: () => null,
    height: () => null,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Unknown")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Hell")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
  {
    id: null,
    name: () => "Curse Devil",
    age: () => null,
    height: () => null,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Unknown")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Hell")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
  {
    id: null,
    name: () => "Fox Devil",
    age: () => null,
    height: () => null,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Female")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Hell")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
  {
    id: null,
    name: () => "Aging Devil",
    age: () => null,
    height: () => null,
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
    genderId: () => gendersData.find((obj) => obj.name() === "Unknown")!.id,
    birthplaceId: () => locationsData.find((obj) => obj.name() === "Hell")!.id,
    statusId: () => statusesData.find((obj) => obj.name() === "Alive")!.id,
  },
];
export const characters = {
  table: getTableName(charactersTable),
  data: charactersData,
};
