/**
 * ! Executing this script will delete all data in your database and seed it with 10 statuses.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const { genders } = await seed.genders([
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ]);

  const { species } = await seed.species((sp) => [
    { name: "Human", species_aliases: [{}] },
    { name: "Devil", species_aliases: [{}] },
    { name: "Hybrid", species_aliases: [{}] },
    { name: "Fiend", species_aliases: [{}] },
    { name: "Fiend Host", species_aliases: [{}] },
  ]);

  const { statuses } = await seed.statuses((status) => [
    {
      name: "Alive",
    },
    {
      name: "Deceased",
    },
    {
      name: "Reincarnated",
    },
  ]);

  const { location_types } = await seed.location_types([
    { name: "Country" },
    { name: "City" },
    { name: "Church" },
    { name: "High School" },
    { name: "Restaurant" },
    { name: "Detention Center" },
  ]);

  const locationValues = ["Japan", "Hell"];

  const { locations } = await seed.locations(
    (loc) =>
      loc(2, ({ index: locIndex }) => ({
        name: `${locationValues[locIndex]}`,
        maps: (map) =>
          map(1, ({ index: mapIndex }) => ({
            image_file_path: `path/to/map-of-${locationValues[locIndex]}`,
          })),
      })),
    { connect: { location_types }, seed: "1984" },
  );

  const { affiliations } = await seed.affiliations((aff) => [
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

  const { occupations } = await seed.occupations((occ) =>
    occ(3, ({ index: charAliasIndex }) => ({})),
  );

  const { characters } = await seed.characters(
    (char) => [
      {
        name: "Denji",
        character_aliases: [
          { name: "Chainsaw Man" },
          { name: "Lord Chainsaw" },
          { name: "Chainsaw Kid" },
          { name: "Red Chainsaw Man" },
        ],
        age: 18,
        height: 173,
        genders: (charCtx) =>
          charCtx.connect(genders.find((gender) => gender.name === "Male")!),
      },
      // ...char(3),
      {
        name: "Power",
        character_aliases: [
          { name: "Blood Fiend" },
          { name: "Detective Power" },
          { name: "Powy" },
          { name: "Number One" },
        ],
        age: null,
        height: 170,
        genders: (charCtx) =>
          charCtx.connect(genders.find((gender) => gender.name === "Female")!),
      },
      {
        name: "Aki",
        character_aliases: [
          { name: "Topknot" },
          { name: "Jerk-face" },
          { name: "Gun Fiend" },
        ],
        age: null,
        height: 182,
        genders: (charCtx) =>
          charCtx.connect(genders.find((gender) => gender.name === "Male")!),
      },
    ],
    {
      connect: { genders, species, statuses, locations },
      seed: "2000",
    },
  );

  await seed.character_affiliations((charAff) => charAff(3, () => ({})), {
    connect: { characters, affiliations },
  });

  await seed.character_occupations((charOcc) => charOcc(3, () => ({})), {
    connect: { characters, occupations },
  });

  await seed.contracts(
    [
      {
        terms:
          "In exchange for letting him live in his right eye, Aki can see a few seconds into the future with the Future Devil's power. For the two others in Public Safety, one has to pay half of their lifespan, and the other one has to exchange their eyes, sense of taste and smell. The price of the exchange will depend on the future of the devil hunter.",
      },
      {
        terms:
          "The Control Devil will give Aki power if he gives everything of himself to her",
      },
      {
        terms:
          "In exchange for most of his lifespan, the Curse Devil kills his target if he stabs it with his sword by three times.",
      },
      {
        terms:
          "In exchange for feeding her a part of his body, Aki may summon the Fox Devil to attack a target. Aki can summon her head because the Fox Devil considers him 'handsome'",
      },
      {
        terms:
          "In exchange for promising to find and befriend the reincarnated blood devil and 'turn her back into Power,' Power gave Denji her blood.",
      },
      {
        terms:
          "In exchange for living a normal life, the Chainsaw Devil became Denji's heart and turned him into a hybrid.",
      },
      {
        terms:
          "In exchange for escaping Aging's World, and Yoshida, Denji, Asa, Yoru and the Aging Devil's Victim to return to their respective worlds and never fight each other again.",
      },
    ],
    {
      connect: { characters },
    },
  );

  const { relative_types } = await seed.relative_types([
    { name: "Sibling" },
    { name: "Parent" },
    { name: "Pet" },
    { name: "Child" },
  ]);

  await seed.relatives((relative) => relative(3, () => ({})), {
    connect: { characters, relative_types },
  });

  console.log("Database seeded successfully!");

  process.exit();
};

main();
