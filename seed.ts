import { createSeedClient } from "@snaplet/seed";
import { charactersData, speciesData } from "seedData";

const seed = await createSeedClient();
await seed.$resetDatabase();

const uniqueStatuses = Array.from(
  new Map(
    charactersData.map((char) => [char.status.name, char.status]),
  ).values(),
);

const { statuses } = await seed.statuses(
  uniqueStatuses.map((status) => ({ name: status.name })),
);

const uniqueGenders = Array.from(
  new Map(
    charactersData.map((char) => [char.gender.name, char.gender]),
  ).values(),
);

const { genders } = await seed.genders(
  uniqueGenders.map((gender) => ({ name: gender.name })),
);

const uniqueSpecies = Array.from(
  new Map(speciesData.map((species) => [species.name, species])).values(),
);

const { species } = await seed.species(
  uniqueSpecies.map((species) => ({
    name: species.name,
    description: species.description,
  })),
);

const uniqueLocationTypes = Array.from(
  new Set(charactersData.map((char) => char.birthplace.locationType)),
);
const { location_types } = await seed.location_types(
  uniqueLocationTypes.map((locationTypeName) => ({ name: locationTypeName })),
);

const uniqueBirthplaces = Array.from(
  new Map(
    charactersData.map((char) => [char.birthplace.name, char.birthplace]),
  ).values(),
);

const { locations } = await seed.locations(
  uniqueBirthplaces.map((bp) => ({
    name: bp.name,
    location_types: (ctx) => {
      const parent = location_types.find(
        (locationType) => locationType.name === bp.locationType,
      )!;
      return ctx.connect(parent);
    },
  })),
);

await seed.characters((x) =>
  x(charactersData.length, ({ index }) => {
    const char = charactersData.at(index)!;

    return {
      name: char.name,
      age: char.age,
      height: char.height,
      species: (ctx) => {
        const parent = species.find(
          (species) => species.name === char.species.name,
        )!;
        return ctx.connect(parent);
      },
      genders: (ctx) => {
        const parent = genders.find(
          (gender) => gender.name === char.gender.name,
        )!;
        return ctx.connect(parent);
      },
      locations: (ctx) => {
        const parent = locations.find(
          (location) => location.name === char.birthplace.name,
        )!;
        return ctx.connect(parent);
      },
      statuses: (ctx) => {
        const parent = statuses.find(
          (status) => status.name === char.status.name,
        )!;
        return ctx.connect(parent);
      },
    };
  }),
);

console.log("Database seeded successfully!");
process.exit();

// {
//   name: "Power",
//   character_aliases: [
//     { name: "Blood Fiend" },
//     { name: "Blood Devil" },
//     { name: "Detective Power" },
//     { name: "Powy" },
//     { name: "Number One" },
//   ],
//   age: null,
//   height: 170,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Female")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Japan")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Deceased")!),
// },
// {
//   name: "Aki",
//   character_aliases: [
//     { name: "Topknot" },
//     { name: "Jerk-face" },
//     { name: "Gun Fiend" },
//   ],
//   age: null,
//   height: 182,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Male")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Human")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Japan")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Deceased")!),
// },
// {
//   name: "Pochita",
//   character_aliases: [
//     { name: "Chainsaw" },
//     { name: "Chainsaw Devil" },
//     { name: "Chainsaw Man" },
//     { name: "Hero of Hell" },
//     { name: "Black Chainsaw Man" },
//   ],
//   age: null,
//   height: null,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Male")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Hell")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Alive")!),
// },
// {
//   name: "Future Devil",
//   character_aliases: [],
//   age: null,
//   height: null,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Unknown")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Hell")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Alive")!),
// },
// {
//   name: "Makima",
//   character_aliases: [
//     { name: "Control Devil" },
//     { name: "Conquest Devil" },
//     { name: "Devil of Domination" },
//   ],
//   age: null,
//   height: 168,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Female")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Japan")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Reincarnated")!),
// },
// {
//   name: "Curse Devil",
//   character_aliases: [],
//   age: null,
//   height: null,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Unknown")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Hell")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Alive")!),
// },
// {
//   name: "Fox Devil",
//   character_aliases: [],
//   age: null,
//   height: null,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Female")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Hell")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Alive")!),
// },
// {
//   name: "Aging Devil",
//   character_aliases: [{ name: "Aging" }],
//   age: null,
//   height: null,
//   genders: (charCtx) =>
//     charCtx.connect(genders.find((gender) => gender.name === "Unknown")!),
//   species: (charCtx) =>
//     charCtx.connect(speciesTable.find((sp) => sp.name === "Devil")!),
//   locations: (charCtx) =>
//     charCtx.connect(locations.find((loc) => loc.name === "Hell")!),
//   statuses: (charCtx) =>
//     charCtx.connect(statuses.find((st) => st.name === "Alive")!),
// },

// const { genders } = await seed.genders([
//   {
//     name: "Male",
//   },
//   {
//     name: "Female",
//   },
//   {
//     name: "Unknown",
//   },
// ]);

// const { species } = await seed.species(() => [
//   {
//     name: "Human",
//     description: null,
//     species_aliases: [],
//   },
//   {
//     name: "Devil",
//     description: "Supernatural creatures born from human concepts",
//     species_aliases: [{ name: "Fears" }],
//   },
//   {
//     name: "Hybrid",
//     description:
//       "Humans who have merged with and can take on the form of a Devil",
//     species_aliases: [
//       {
//         name: "Devil-humans",
//       },
//       {
//         name: "Weapon-humans",
//       },
//     ],
//   },
//   {
//     name: "Fiend",
//     description: "Devils that possess corpses.",
//     species_aliases: [
//       {
//         name: "Majin",
//       },
//       {
//         name: "Devilmen",
//       },
//     ],
//   },
// ]);

// const { statuses } = await seed.statuses(() => [
//   {
//     name: "Alive",
//   },
//   {
//     name: "Deceased",
//   },
//   {
//     name: "Reincarnated",
//   },
// ]);

// const { location_types } = await seed.location_types([
//   { name: "Country" },
//   { name: "City" },
//   { name: "Church" },
//   { name: "High School" },
//   { name: "Restaurant" },
//   { name: "Detention Center" },
// ]);

// const locationValues = ["Japan", "Hell"];

// const { locations } = await seed.locations(
//   (loc) =>
//     loc(2, ({ index: locIndex }) => ({
//       name: `${locationValues[locIndex]}`,
//       maps: (map) =>
//         map(1, () => ({
//           image_file_path: `path/to/map-of-${locationValues[locIndex]}`,
//         })),
//     })),
//   { connect: { location_types }, seed: "1984" },
// );

// const { affiliations } = await seed.affiliations(() => [
//   { name: "Pochita" },
//   { name: "Yakuza" },
//   { name: "Public Safety Devil Hunters" },
//   { name: "Tokyo Special Division 4" },
//   { name: "Fourth East High School" },
//   { name: "Chainsaw Man Church" },
//   { name: "Bat Devil" },
//   { name: "Tokyo Divison 2" },
//   { name: "Devil Hunters" },
//   { name: "Weapon Devils" },
// ]);

// const { occupations } = await seed.occupations([
//   { name: "Private Devil Hunter" },
//   { name: "Public Safety Devil Hunter" },
//   { name: "High School Student" },
//   { name: "Wild Fiend" },
//   { name: "Wild Devil" },
//   { name: "Contract Devil" },
// ]);

// const findSpeciesRecord = async (value: string) =>
//   await db.query.species.findFirst({
//     where: (species, { eq }) => eq(species.name, value),
//   });

// const species = await db.query["species"].findFirst({
//   where: (species, { eq }) => eq(species["name"], "Human"),
// });

// const species = await db.query.species.findMany();
// console.log(species);

// await seed.character_affiliations([
//   {
//     characters: (ctx) =>
//       ctx.connect(characters.find((char) => char.name === "Denji")!),
//     affiliations: (ctx) =>
//       ctx.connect(affiliations.find((aff) => aff.name === "Pochita")!),
//   },
// ]);

// await seed.character_affiliations((charAff) => charAff(3, () => ({})), {
//   connect: { characters, affiliations },
// });

// await seed.character_occupations((charOcc) => charOcc(3, () => ({})), {
//   connect: { characters, occupations },
// });

// await seed.contracts(
//   [
//     {
//       terms:
//         "In exchange for letting him live in his right eye, Aki can see a few seconds into the future with the Future Devil's power. For the two others in Public Safety, one has to pay half of their lifespan, and the other one has to exchange their eyes, sense of taste and smell. The price of the exchange will depend on the future of the devil hunter.",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Future Devil")!,
//         ),
//     },
//     {
//       terms:
//         "The Control Devil will give Aki power if he gives everything of himself to her",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Makima")!,
//         ),
//     },
//     {
//       terms:
//         "In exchange for most of his lifespan, the Curse Devil kills his target if he stabs it with his sword by three times.",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Curse Devil")!,
//         ),
//     },
//     {
//       terms:
//         "In exchange for feeding her a part of his body, Aki may summon the Fox Devil to attack a target. Aki can summon her head because the Fox Devil considers him 'handsome'",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Fox Devil")!,
//         ),
//     },
//     {
//       terms:
//         "In exchange for promising to find and befriend the reincarnated blood devil and 'turn her back into Power,' Power gave Denji her blood.",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Denji")!,
//         ),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Power")!,
//         ),
//     },
//     {
//       terms:
//         "In exchange for living a normal life, the Chainsaw Devil became Denji's heart and turned him into a hybrid.",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Denji")!,
//         ),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Pochita")!,
//         ),
//     },
//     {
//       terms:
//         "In exchange for escaping Aging's World, and Yoshida, Denji, Asa, Yoru and the Aging Devil's Victim to return to their respective worlds and never fight each other again.",
//       characters_contracts_human_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Denji")!,
//         ),
//       characters_contracts_devil_idTocharacters: (contractCtx) =>
//         contractCtx.connect(
//           characters.find((char) => char.name === "Aging Devil")!,
//         ),
//     },
//   ],
//   // {
//   //   connect: { characters },
//   // },
// );

// const { relative_types } = await seed.relative_types([
//   { name: "Mother" },
//   { name: "Father" },
//   { name: "Child" },
//   { name: "Sister" },
//   { name: "Brother" },
//   { name: "Owner" },
//   { name: "Pet" },
//   { name: "Devil Pet" },
//   { name: "Previous Incarnation" },
//   { name: "Reincarnation" },
//   { name: "Boyfriend" },
//   { name: "Girlfriend" },
// ]);

// await seed.relatives((relative) => relative(3, () => ({})), {
//   connect: { characters, relative_types },
// });
