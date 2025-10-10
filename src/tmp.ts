import { sql } from "bun";

import { statusesTable } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

async function main() {
  const status: typeof statusesTable.$inferInsert = {
    name: "Alive",
  };

  await db.insert(statusesTable).values(status);
  console.log("New status created!");

  const statuses = await db.select().from(statusesTable);
  const selectedStatus = statuses[0];
  console.log("Getting all statuses from the database: ", statuses);

  await db
    .update(statusesTable)
    .set({
      name: "Dead",
    })
    .where(eq(statusesTable.id, selectedStatus!.id));
  console.log("Status info updated!");

  await db
    .delete(statusesTable)
    .where(eq(statusesTable.id, selectedStatus!.id));
  console.log("Status deleted!");
}

main();

// const result = await sql.file("./src/queries/tmp.sql");
// console.log(result);
