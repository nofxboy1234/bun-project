import * as schema from "@/db/schema";
import { db } from "@/db";
import { reset, seed } from "drizzle-seed";

const seedVal = 9999;

async function main() {
  await reset(db, schema);

  await seed(db, {
    affiliations: schema.affiliations,
    genders: schema.genders,
    locationTypes: schema.locationTypes,
    occupations: schema.occupations,
    relativeTypes: schema.relativeTypes,
    species: schema.species,
    statuses: schema.statuses,
  });

  const affiliations = await db.select().from(schema.affiliations);
  const genders = await db.select().from(schema.genders);
  const locationTypes = await db.select().from(schema.locationTypes);
  const occupations = await db.select().from(schema.occupations);
  const relativeTypes = await db.select().from(schema.relativeTypes);
  const species = await db.select().from(schema.species);
  const statuses = await db.select().from(schema.statuses);

  await seed(db, {
    locations: schema.locations,
    speciesAliases: schema.speciesAliases,
  }).refine((f) => ({
    locations: {
      columns: {
        locationTypeId: f.valuesFromArray({
          values: locationTypes.map((value) => value.id),
        }),
      },
    },
    speciesAliases: {
      columns: {
        speciesId: f.valuesFromArray({
          values: species.map((value) => value.id),
        }),
      },
    },
  }));

  const locations = await db.select().from(schema.locations);
  const speciesAliases = await db.select().from(schema.speciesAliases);

  await seed(db, {
    maps: schema.maps,
    characters: schema.characters,
    // characterAliases: schema.characterAliases,
    // contracts: schema.contracts,
    // relatives: schema.relatives,
    // characterAffiliations: schema.characterAffiliations,
    // characterOccupations: schema.characterOccupations,
  }).refine((f) => ({
    maps: {
      columns: {
        locationId: f.valuesFromArray({
          values: locations.map((value) => value.id),
          isUnique: true,
        }),
      },
    },
    characters: {
      columns: {
        speciesId: f.valuesFromArray({
          values: species.map((value) => value.id),
        }),
        genderId: f.valuesFromArray({
          values: genders.map((value) => value.id),
        }),
        birthplaceId: f.valuesFromArray({
          values: locations.map((value) => value.id),
        }),
        statusId: f.valuesFromArray({
          values: statuses.map((value) => value.id),
        }),
      },
    },
  }));

  const maps = await db.select().from(schema.maps);
  const characters = await db.select().from(schema.characters);

  await seed(
    db,
    {
      characterAliases: schema.characterAliases,
      // contracts: schema.contracts,
      // characterOccupations: schema.characterOccupations,
      // relatives: schema.relatives,
    },
    { seed: seedVal },
  ).refine((f) => ({
    characterAliases: {
      columns: {
        characterId: f.valuesFromArray({
          values: characters.map((value) => value.id),
        }),
      },
    },
  }));

  const mulberry32 = (a: number) => {
    return () => {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const rng = mulberry32(seedVal);

  // Manual seeding for characterAffiliations (Many-to-Many)
  // This avoids unique constraint violations while allowing multiple affiliations per character.
  const allAffiliationIds = affiliations.map((a) => a.id);
  const characterAffiliationsData: {
    characterId: number;
    affiliationId: number;
  }[] = [];

  for (const char of characters) {
    // Randomly assign 0 to 3 affiliations per character using seeded rng
    const numAffiliations = Math.floor(rng() * 4);

    // Shuffle and pick unique IDs using seeded rng
    const shuffled = [...allAffiliationIds].sort(() => 0.5 - rng());
    const selected = shuffled.slice(0, numAffiliations);

    for (const affId of selected) {
      characterAffiliationsData.push({
        characterId: char.id,
        affiliationId: affId,
      });
    }
  }

  if (characterAffiliationsData.length > 0) {
    await db
      .insert(schema.characterAffiliations)
      .values(characterAffiliationsData);
  }
}

main();
