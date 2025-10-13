import { locationTypes, locations } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

async function main() {
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
  // const locationTypesResult = await db
  //   .select()
  //   .from(locationTypes)
  //   .where(eq(locationTypes.name, "Country"));
  // const locationType = locationTypesResult[0];
  // const location: typeof locations.$inferInsert = {
  //   name: "South Africa",
  //   locationTypeId: locationType!.id,
  // };
  // await db.insert(locations).values(location);
  // const locationsResults = await db.select().from(locations);
  // console.log(locationsResults);

  let result;
  result = await db.query.locationTypes.findMany({
    with: {
      locations: true,
    },
  });
  console.log(result);

  result = await db
    .select()
    .from(locationTypes)
    .leftJoin(locations, eq(locationTypes.id, locations.locationTypeId));
  console.log(result);
}

main();
