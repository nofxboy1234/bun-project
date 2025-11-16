import { getTableName } from "drizzle-orm";

import {
  species as speciesTable,
  genders as gendersTable,
  locationTypes as locationTypesTable,
  locations as locationsTable,
  statuses as statusesTable,
  characters as charactersTable,
  relativeTypes as relativeTypesTable,
  affiliations as affiliationsTable,
  occupations as occupationsTable,
  speciesAliases as speciesAliasesTable,
  maps as mapsTable,
  characterAliases as characterAliasesTable,
} from "@/db/schema";

import type { TableData } from "@/types";

const statusesData = [
  { id: null, name: () => "Alive" },
  { id: null, name: () => "Deceased" },
  { id: null, name: () => "Reincarnated" },
];
export const statuses: TableData = {
  table: getTableName(statusesTable),
  data: statusesData,
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

const relativeTypesData = [
  {
    id: null,
    name: () => "Mother",
  },
  {
    id: null,
    name: () => "Father",
  },
  {
    id: null,
    name: () => "Son",
  },
  {
    id: null,
    name: () => "Daughter",
  },
  {
    id: null,
    name: () => "Sister",
  },
  {
    id: null,
    name: () => "Brother",
  },
  {
    id: null,
    name: () => "Owner",
  },
  {
    id: null,
    name: () => "Pet",
  },
  {
    id: null,
    name: () => "Devil Pet",
  },
  {
    id: null,
    name: () => "Previous Incarnation",
  },
  {
    id: null,
    name: () => "Reincarnation",
  },
  {
    id: null,
    name: () => "Boyfriend",
  },
  {
    id: null,
    name: () => "Girlfriend",
  },
];
export const relativeTypes = {
  table: getTableName(relativeTypesTable),
  data: relativeTypesData,
};

const affiliationsData = [
  {
    id: null,
    name: () => "Pochita",
  },
  {
    id: null,
    name: () => "Yakuza",
  },
  {
    id: null,
    name: () => "Public Safety Devil Hunters",
  },
  { id: null, name: () => "Tokyo Special Division 4" },
  { id: null, name: () => "Fourth East High School" },
  { id: null, name: () => "Chainsaw Man Church" },
  { id: null, name: () => "Bat Devil" },
  { id: null, name: () => "Tokyo Divison 2" },
  { id: null, name: () => "Devil Hunters" },
  { id: null, name: () => "Weapon Devils" },
];
export const affiliations = {
  table: getTableName(affiliationsTable),
  data: affiliationsData,
};

const occupationsData = [
  { id: null, name: () => "Private Devil Hunter" },
  { id: null, name: () => "Public Safety Devil Hunter" },
  { id: null, name: () => "High School Student" },
  { id: null, name: () => "Wild Fiend" },
  { id: null, name: () => "Wild Devil" },
  { id: null, name: () => "Contract Devil" },
];
export const occupations = {
  table: getTableName(occupationsTable),
  data: occupationsData,
};

const locationsData = [
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

const speciesAliasesData = [
  {
    id: null,
    name: () => "Fears",
    speciesId: () => speciesData.find((obj) => obj.name() === "Devil")!.id,
  },
  {
    id: null,
    name: () => "Devil-humans",
    speciesId: () => speciesData.find((obj) => obj.name() === "Hybrid")!.id,
  },
  {
    id: null,
    name: () => "Weapon-humans",
    speciesId: () => speciesData.find((obj) => obj.name() === "Hybrid")!.id,
  },
  {
    id: null,
    name: () => "Majin",
    speciesId: () => speciesData.find((obj) => obj.name() === "Fiend")!.id,
  },
  {
    id: null,
    name: () => "Devilmen",
    speciesId: () => speciesData.find((obj) => obj.name() === "Fiend")!.id,
  },
];
export const speciesAliases = {
  table: getTableName(speciesAliasesTable),
  data: speciesAliasesData,
};

const mapsData = [
  {
    id: null,
    imageFilePath: () => "path/to/map-of-japan",
    locationId: () => locationsData.find((obj) => obj.name() === "Japan")!.id,
  },
];
export const maps = {
  table: getTableName(mapsTable),
  data: mapsData,
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

const characterAliasesData = [
  {
    id: null,
    name: () => "Blood Fiend",
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },
  {
    id: null,
    name: () => "Blood Devil",
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },
  {
    id: null,
    name: () => "Detective Power",
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },
  {
    id: null,
    name: () => "Powy",
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },
  {
    id: null,
    name: () => "Number One",
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },

  {
    id: null,
    name: () => "Topknot",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
  },
  {
    id: null,
    name: () => "Jerk-face",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
  },
  {
    id: null,
    name: () => "Gun Fiend",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
  },

  {
    id: null,
    name: () => "Chainsaw",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    name: () => "Chainsaw Devil",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    name: () => "Chainsaw Man",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    name: () => "Hero of Hell",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    name: () => "Black Chainsaw Man",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },

  {
    id: null,
    name: () => "Control Devil",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
  },
  {
    id: null,
    name: () => "Conquest Devil",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
  },
  {
    id: null,
    name: () => "Devil of Domination",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
  },

  {
    id: null,
    name: () => "Aging",
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
  },
];
export const characterAliases = {
  table: getTableName(characterAliasesTable),
  data: characterAliasesData,
};
