import { db } from "./db";
import { reset, seed } from "drizzle-seed";
import * as schema from "@/db/schema";

async function main() {
  await reset(db, schema);
  await seed(db, schema, { seed: 1984 }).refine((f) => ({
    statuses: {
      columns: {
        name: f.valuesFromArray({
          values: ["Alive", "Deceased", "Reincarnated"],
        }),
      },
    },
    affiliations: {
      columns: {
        name: f.valuesFromArray({
          values: [
            "Pochita",
            "Yakuza",
            "Public Safety Devil Hunters",
            "Tokyo Special Division 4",
            "Fourth East High School",
            "Chainsaw Man Church",
            "Bat Devil",
            "Tokyo Divison 2",
            "Devil Hunters",
            "Weapon Devils",
          ],
        }),
      },
    },
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
    genders: {
      columns: {
        name: f.valuesFromArray({
          values: ["Male", "Female"],
        }),
      },
    },
    locationTypes: {
      columns: {
        name: f.valuesFromArray({
          values: [
            "Country",
            "City",
            "Church",
            "High School",
            "Restaurant",
            "Detention Center",
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
