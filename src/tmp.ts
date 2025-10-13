import { locationTypesTable, locationsTable } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

async function main() {
  const result = await db.query.locationTypesTable.findMany({
    with: {
      locations: true,
    },
  });
  console.log(result);

  // const o1 = { a: { b: { c: { d: { e: 5 } } } } };
  // console.log(o1);

  // const locationTypeCity: typeof locationTypesTable.$inferInsert = {
  //   name: "City",
  // };

  // const locationTypeCountry: typeof locationTypesTable.$inferInsert = {
  //   name: "Country",
  // };

  // await db.insert(locationTypesTable).values(locationTypeCity);
  // await db.insert(locationTypesTable).values(locationTypeCountry);

  // const locationTypes = await db
  //   .select()
  //   .from(locationTypesTable)
  //   .where(eq(locationTypesTable.name, "City"));

  // const locationType = locationTypes[0];

  // const location: typeof locationsTable.$inferInsert = {
  //   name: "Tokyo",
  //   locationTypeId: locationType!.id,
  // };

  // await db.insert(locationsTable).values(location);

  // const locations = await db.select().from(locationsTable);
  // console.log(locations);
}

main();
