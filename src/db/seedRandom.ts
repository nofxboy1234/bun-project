import * as schema from "@/db/schema";
import { db } from "@/db";
import { reset, seed } from "drizzle-seed";
import { count, eq } from "drizzle-orm";

const seedVal = 9999;

async function main() {
  console.log("hello");

  await reset(db, schema);

  await seed(db, {
    affiliations: schema.affiliations,
    genders: schema.genders,
    locationTypes: schema.locationTypes,
    occupations: schema.occupations,
    relativeTypes: schema.relativeTypes,
    species: schema.species,
    statuses: schema.statuses,
  }).refine((f) => ({
    affiliations: {
      columns: {
        name: f.companyName(),
      },
    },
    genders: {
      columns: {
        name: f.valuesFromArray({
          isUnique: true,
          values: ["Male", "Female"],
        }),
      },
      count: 2,
    },
    species: {
      columns: {
        name: f.valuesFromArray({
          isUnique: true,
          values: ["Human", "Devil", "Fiend", "Hybrid"],
        }),
      },
      count: 4,
    },
  }));

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
  const males = await db.query.genders.findMany({
    where: {
      name: "Male",
    },
  });
  const females = await db.query.genders.findMany({
    where: {
      name: "Female",
    },
  });

  await seed(db, {
    maps: schema.maps,
    characters: schema.characters,
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
        name: f.firstName({
          isUnique: true,
        }),
        speciesId: f.valuesFromArray({
          values: species.map((value) => value.id),
        }),
        genderId: f.valuesFromArray({
          values: [
            { weight: 0.3, values: males.map((value) => value.id) },
            { weight: 0.7, values: females.map((value) => value.id) },
          ],
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
  const humans = await db.query.characters.findMany({
    where: {
      species: {
        name: "Human",
      },
    },
  });
  const devils = await db.query.characters.findMany({
    where: {
      species: {
        name: "Devil",
      },
    },
  });

  await seed(
    db,
    {
      characterAliases: schema.characterAliases,
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

  // characterAffiliations
  const allAffiliationIds = affiliations.map((a) => a.id);
  const characterAffiliationsData: {
    characterId: number;
    affiliationId: number;
  }[] = [];

  for (const char of characters) {
    const numAffiliations = Math.floor(rng() * 4);

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

  // contracts
  const allDevilIds = devils.map((a) => a.id);
  const contractsData: {
    terms: string;
    humanId: number;
    devilId: number;
  }[] = [];

  for (const human of humans) {
    const numContracts = Math.floor(rng() * 7);

    const shuffled = [...allDevilIds].sort(() => 0.5 - rng());
    const selected = shuffled.slice(0, numContracts);

    for (const devilId of selected) {
      contractsData.push({
        terms: "a contract!",
        humanId: human.id,
        devilId: devilId,
      });
    }
  }

  if (contractsData.length > 0) {
    await db.insert(schema.contracts).values(contractsData);
  }

  // characterOccupations
  const allOccupationIds = occupations.map((a) => a.id);
  const characterOccupationsData: {
    characterId: number;
    occupationId: number;
  }[] = [];

  for (const char of characters) {
    const numOccupations = Math.floor(rng() * 5);

    const shuffled = [...allOccupationIds].sort(() => 0.5 - rng());
    const selected = shuffled.slice(0, numOccupations);

    for (const occId of selected) {
      characterOccupationsData.push({
        characterId: char.id,
        occupationId: occId,
      });
    }
  }

  if (characterOccupationsData.length > 0) {
    await db
      .insert(schema.characterOccupations)
      .values(characterOccupationsData);
  }

  // relatives
  const allCharacterIds = characters.map((a) => a.id);
  const relativesData: {
    character1Id: number;
    character2Id: number;
    relativeTypeId: number;
  }[] = [];
  const allRelativeTypeIds = relativeTypes.map((a) => a.id);

  for (const char of characters) {
    const numRelatives = Math.floor(rng() * 6);

    const shuffled = [...allCharacterIds].sort(() => 0.5 - rng());
    const selected = shuffled.slice(0, numRelatives);

    for (const charId of selected) {
      const shuffled = [...allRelativeTypeIds].sort(() => 0.5 - rng());
      const selectedId = shuffled[0];

      relativesData.push({
        character1Id: char.id,
        character2Id: charId,
        relativeTypeId: selectedId,
      });
    }
  }

  if (relativesData.length > 0) {
    await db.insert(schema.relatives).values(relativesData);
  }

  const genderCounts = await db
    .select({
      gender: schema.genders.name,
      count: count(schema.characters.id),
    })
    .from(schema.characters)
    .leftJoin(schema.genders, eq(schema.characters.genderId, schema.genders.id))
    .groupBy(schema.genders.name);
  console.log(genderCounts);
}

await main();
