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
  contracts as contractsTable,
  relatives as relativesTable,
  characterAffiliations as characterAffiliationsTable,
  characterOccupations as characterOccupationsTable,
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
  { id: null, name: () => "Tokyo Special Division 5" },
  { id: null, name: () => "Fourth East High School" },
  { id: null, name: () => "Chainsaw Man Church" },
  { id: null, name: () => "Bat Devil" },
  { id: null, name: () => "Tokyo Divison 2" },
  { id: null, name: () => "Devil Hunters" },
  { id: null, name: () => "Weapon Devils" },
  { id: null, name: () => "Four Horsemen" },
  { id: null, name: () => "Tokyo Division 2" },
  { id: null, name: () => "Denji" },
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
  { id: null, name: () => "Denji's Heart" },
  { id: null, name: () => "Primal Fear" },
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

const contractsData = [
  {
    id: null,
    terms: () =>
      "In exchange for letting him live in his right eye, Aki can see a few seconds into the future with the Future Devil's power. For the two others in Public Safety, one has to pay half of their lifespan, and the other one has to exchange their eyes, sense of taste and smell. The price of the exchange will depend on the future of the devil hunter.",
    humanId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    devilId: () =>
      charactersData.find((obj) => obj.name() === "Future Devil")!.id,
  },
  {
    id: null,
    terms: () =>
      "The Control Devil will give Aki power if he gives everything of himself to her",
    humanId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    devilId: () => charactersData.find((obj) => obj.name() === "Makima")!.id,
  },
  {
    id: null,
    terms: () =>
      "In exchange for most of his lifespan, the Curse Devil kills his target if he stabs it with his sword by three times.",
    humanId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    devilId: () =>
      charactersData.find((obj) => obj.name() === "Curse Devil")!.id,
  },
  {
    id: null,
    terms: () =>
      "In exchange for feeding her a part of his body, Aki may summon the Fox Devil to attack a target. Aki can summon her head because the Fox Devil considers him 'handsome'",
    humanId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    devilId: () => charactersData.find((obj) => obj.name() === "Fox Devil")!.id,
  },

  {
    id: null,
    terms: () =>
      "In exchange for promising to find and befriend the reincarnated blood devil and 'turn her back into Power,' Power gave Denji her blood.",
    humanId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    devilId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
  },
  {
    id: null,
    terms: () =>
      "In exchange for living a normal life, the Chainsaw Devil became Denji's heart and turned him into a hybrid.",
    humanId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    devilId: () => charactersData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    terms: () =>
      "In exchange for escaping Aging's World, and Yoshida, Denji, Asa, Yoru and the Aging Devil's Victim to return to their respective worlds and never fight each other again.",
    humanId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    devilId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
  },
];
export const contracts = {
  table: getTableName(contractsTable),
  data: contractsData,
};

const relativesData = [
  {
    id: null,
    character1Id: () =>
      charactersData.find((obj) => obj.name() === "Denji")!.id,
    character2Id: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    relativeTypeId: () =>
      relativeTypesData.find((obj) => obj.name() === "Devil Pet")!.id,
  },
  {
    id: null,
    character1Id: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    character2Id: () =>
      charactersData.find((obj) => obj.name() === "Denji")!.id,
    relativeTypeId: () =>
      relativeTypesData.find((obj) => obj.name() === "Owner")!.id,
  },
];
export const relatives = {
  table: getTableName(relativesTable),
  data: relativesData,
};

const characterAffiliationsData = [
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Pochita")!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Yakuza")!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Special Division 4")!
        .id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Fourth East High School")!
        .id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Chainsaw Man Church")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Yakuza")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Denji")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Four Horsemen")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Special Division 4")!
        .id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Special Division 5")!
        .id,
  },

  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Bat Devil")!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Special Division 4")!
        .id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Division 2")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    affiliationId: () =>
      affiliationsData.find((obj) => obj.name() === "Tokyo Special Division 4")!
        .id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Future Devil")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Fox Devil")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
    affiliationId: () =>
      affiliationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunters",
      )!.id,
  },
];
export const characterAffiliations = {
  table: getTableName(characterAffiliationsTable),
  data: characterAffiliationsData,
};

// { id: null, name: () => "Private Devil Hunter" },
// { id: null, name: () => "Public Safety Devil Hunter" },
// { id: null, name: () => "High School Student" },
// { id: null, name: () => "Wild Fiend" },
// { id: null, name: () => "Wild Devil" },
// { id: null, name: () => "Contract Devil" },
// { id: null, name: () => "Denji's Heart" },

const characterOccupationsData = [
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Private Devil Hunter")!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    occupationId: () =>
      occupationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunter",
      )!.id,
  },
  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Denji")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "High School Student")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Wild Devil")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Pochita")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Denji's Heart")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    occupationId: () =>
      occupationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunter",
      )!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Makima")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },

  {
    id: null,
    characterId: () => charactersData.find((obj) => obj.name() === "Power")!.id,
    occupationId: () =>
      occupationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunter",
      )!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    occupationId: () =>
      occupationsData.find(
        (obj) => obj.name() === "Public Safety Devil Hunter",
      )!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aki Hayakawa")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Wild Fiend")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Future Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Curse Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Fox Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Wild Devil")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Fox Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },

  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Wild Devil")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Contract Devil")!.id,
  },
  {
    id: null,
    characterId: () =>
      charactersData.find((obj) => obj.name() === "Aging Devil")!.id,
    occupationId: () =>
      occupationsData.find((obj) => obj.name() === "Primal Fear")!.id,
  },
];
export const characterOccupations = {
  table: getTableName(characterOccupationsTable),
  data: characterOccupationsData,
};
