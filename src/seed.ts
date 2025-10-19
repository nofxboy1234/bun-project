import { db } from "./db";
import {
  affiliations,
  characterAffiliations,
  characterAliases,
  characterOccupations,
  characters,
  contracts,
  genders,
  locationTypes,
  locations,
  maps,
  occupations,
  relatives,
  species,
  speciesAliases,
  statuses,
} from "@/db/schema";

async function main() {
  db.query.characters.findMany({
    with: {
      characterAffiliations: {
        columns: {
          affiliationId: false,
          characterId: false,
          created_at: false,
          id: false,
        },
        with: {
          affiliation: true,
        },
      },
    },
  });

  db.delete(characterAffiliations);
  db.delete(characterAliases);
  db.delete(characterOccupations);
  db.delete(characters);
  db.delete(contracts);
  db.delete(maps);
  db.delete(relatives);
  db.delete(species);
  db.delete(speciesAliases);

  db.delete(locations);
  db.delete(genders);
  db.delete(locationTypes);
  db.delete(statuses);
  db.delete(affiliations);
  db.delete(occupations);

  db.insert(genders).values([{ name: "Male" }, { name: "Female" }]);
  db.insert(locationTypes).values([
    { name: "Country" },
    { name: "City" },
    { name: "Church" },
    { name: "High School" },
    { name: "Restaurant" },
    { name: "Detention Center" },
  ]);
  db.insert(statuses).values([
    { name: "Alive" },
    { name: "Deceased" },
    { name: "Reincarnated" },
  ]);
  db.insert(affiliations).values([
    { name: "Pochita" },
    { name: "Yakuza" },
    { name: "Public Safety Devil Hunters" },
    { name: "Tokyo Special Division 4" },
    { name: "Fourth East High School" },
    { name: "Chainsaw Man Church" },
    { name: "Bat Devil" },
    { name: "Tokyo Divison 2" },
    { name: "Devil Hunters" },
    { name: "Weapon Devils" },
  ]);
  db.insert(occupations).values([
    { name: "Private Devil Hunter" },
    { name: "Public Safety Devil Hunter" },
    { name: "High School Student" },
    { name: "Wild Fiend" },
  ]);
  db.insert(locations).values([{ name: "", locationTypeId: 1 }]);

  await seed(db, schema, { seed: 1984 }).refine((f) => ({
    characterAliases: {
      columns: {
        name: f.valuesFromArray({
          values: [
            "Chainsaw Man",
            "Lord Chainsaw",
            "Chainsaw Kid",
            "Red Chainsaw Man",
            "Blood Fiend",
            "Detective Power",
            "Powy",
            "Number One",
            "Topknot",
            "Jerk-face",
            "Gun Fiend",
          ],
        }),
      },
    },
    characters: {
      columns: {
        name: f.valuesFromArray({
          values: ["Denji", "Power", "Aki Hayakawa"],
          isUnique: true,
        }),
        age: f.int({
          minValue: 16,
          maxValue: 100,
        }),
        height: f.int({
          minValue: 16,
          maxValue: 100,
        }),
      },
      count: 3,
    },
    contracts: {
      columns: {
        terms: f.valuesFromArray({
          values: [
            "In exchange for letting him live in his right eye, Aki can see a few seconds into the future with the Future Devil's power. For the two others in Public Safety, one has to pay half of their lifespan, and the other one has to exchange their eyes, sense of taste and smell. The price of the exchange will depend on the future of the devil hunter.",
            "The Control Devil will give Aki power if he gives everything of himself to her",
            "In exchange for most of his lifespan, the Curse Devil kills his target if he stabs it with his sword by three times.",
            "In exchange for feeding her a part of his body, Aki may summon the Fox Devil to attack a target. Aki can summon her head because the Fox Devil considers him 'handsome'",
            'In exchange for promising to find and befriend the reincarnated blood devil and "turn her back into Power," Power gave Denji her blood.',
            "In exchange for living a normal life, the Chainsaw Devil became Denji's heart and turned him into a hybrid.",
            "In exchange for escaping Aging's World, and Yoshida, Denji, Asa, Yoru and the Aging Devil's Victim to return to their respective worlds and never fight each other again.",
          ],
        }),
      },
    },
    locations: {
      columns: {
        name: f.country(),
      },
    },
    occupations: {
      columns: {
        name: f.valuesFromArray({
          values: [
            "Private Devil Hunter",
            "Public Safety Devil Hunter",
            "High School Student",
            "Wild Fiend",
          ],
        }),
      },
    },
    relatives: {
      columns: {
        type: f.valuesFromArray({
          values: ["Sibling", "Parent", "Pet", "Child"],
        }),
      },
    },
    species: {
      columns: {
        name: f.valuesFromArray({
          values: ["Human", "Hybrid", "Fiend", "Devil", "Fiend Host"],
        }),
        description: f.loremIpsum({
          sentencesCount: Math.floor(Math.random() * 10) + 1,
        }),
      },
    },
    speciesAliases: {
      columns: {
        name: f.valuesFromArray({
          values: ["Majin", "Devilmen", "Devil-human", "Weapon-human", "Fear"],
        }),
      },
    },
  }));

  // await reset(db, { statuses });
  // await seed(db, { statuses }, { seed: 1984 });
}

main();
