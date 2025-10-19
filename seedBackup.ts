/**
 * ! Executing this script will delete all data in your database and seed it with 10 statuses.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const baseClient = await createSeedClient();

  // Truncate all tables in the database
  await baseClient.$resetDatabase();

  const { species } = await baseClient.species([
    { name: "Human" },
    { name: "Devil" },
    // { name: "Hybrid" },
    // { name: "Fiend" },
    // { name: "Fiend Host" },
  ]);

  const seed = await createSeedClient({
    connect: {
      species,
    },
  });

  const { statuses } = await seed.statuses((x) => x(3));
  const { locations, characters } = await seed.locations(
    (loc) =>
      loc(3, () => ({
        characters: (char) =>
          char(1, ({ index }) => {
            const sp =
              index === 0
                ? species.find((s) => s.name === "Human")
                : species.find((s) => s.name === "Devil");
            return {
              species: (ctx) => ctx.connect(sp!),
            };
          }),
      })),
    { connect: { statuses } },
  );

  // await seed.affiliations();

  // await seed.location_types([
  //   {
  //     locations: [{}, {}, {}, {}],
  //     // locations: (x) => x(3),
  //   },
  // ]);

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

  // const { locations } = await seed.locations([
  //   {
  //     location_types: (x) => ({}),
  //   },
  // ]);

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
