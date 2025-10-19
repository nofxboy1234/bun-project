/**
 * ! Executing this script will delete all data in your database and seed it with 10 statuses.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

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
    { name: "Human" },
    { name: "Devil" },
    { name: "Hybrid" },
    { name: "Fiend" },
    { name: "Fiend Host" },
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

  await seed.characters(
    (char) => [
      {
        name: "Denji",
      },
      // ...char(3),
      {
        name: "Power",
      },
      {
        name: "Aki",
      },
    ],
    {
      connect: { genders, species, statuses },
      seed: "2000",
    },
  );

  // await seed.characters((char) => char(3, ({ index }) => ({})), {
  //   connect: { genders, species },
  //   seed: "2000",
  // });

  // ************************

  // const { locations, characters } = await seed.locations(
  //   (loc) =>
  //     loc(3, ({ index: locIndex }) => ({
  //       characters: (char) =>
  //         char(1, ({ index }) => {
  //           const sp =
  //             locIndex === 0
  //               ? species.find((s) => s.name === "Human")
  //               : species.find((s) => s.name === "Devil");
  //           return {
  //             species: (ctx) => ctx.connect(sp!),
  //           };
  //         }),
  //     })),
  //   // { connect: { statuses } },
  // );

  // ************************

  // await baseClient.location_types([
  //   {
  //     locations: [{}, {}, {}, {}],
  //     // locations: (x) => x(3),
  //   },
  // ]);

  // await seed.affiliations();

  // await seed.location_types((x) => x(1));

  // await seed.locations((x) => x(3));

  // *
  // const { locations } = await seed.locations((x) => x(1));
  // await seed.characters((x) => x(3), { connect: { locations } });

  // const { locations } = await seed.locations((x) => x(3));
  // await seed.characters((x) => x(100), { connect: { locations } });

  /* 
  species: 2
  locations: 2 + 3
  location_types: 2
  statuses: 3
  characters: 9
  */

  // const { locations } = await baseClient.locations((loc) =>
  //   loc(3, ({ index }) => ({
  //     location_types: () => ({ name: `location_type_${index}!` }),
  //   })),
  // );

  // const { locations } = await seed.locations([
  //   {
  //     location_types: { name: "hello" },
  //   },
  //   {
  //     location_types: { name: "bye" },
  //   },
  //   {
  //     location_types: { name: "yay" },
  //   },
  // ]);

  const { locations } = await seed.locations((x) =>
    x(3, ({ index: locIndex }) => ({
      location_types: (x) => ({ name: "hello" }),
      maps: (map) =>
        map(1, ({ index: mapIndex }) => ({
          image_file_path: `path/to/file${locIndex}`,
        })),
    })),
  );

  // const { locations } = await seed.locations((x) => [
  //   {
  //     location_types: (x) => ({ name: "hello" }),
  //     maps: (map) =>
  //       map(1, ({ index }) => ({
  //         image_file_path: `path/to/file${index}`,
  //       })),
  //   },
  //   {
  //     location_types: (x) => ({ name: "bye" }),
  //     maps: (map) =>
  //       map(1, ({ index }) => ({
  //         image_file_path: `path/to/file${index}`,
  //       })),
  //   },
  //   {
  //     location_types: (x) => ({ name: "yay" }),
  //     maps: (map) =>
  //       map(1, ({ index }) => ({
  //         image_file_path: `path/to/file${index}`,
  //       })),
  //   },
  // ]);

  // await seed.locations(
  //   (x) =>
  //     x(1, {
  //       characters: [{}, {}, {}],
  //     }),
  //   { seed: "1984" },
  // );

  // await seed.locations([{}]);
  // await seed.statuses((x) => x(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
