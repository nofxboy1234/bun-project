import { db } from "./db";
import { seed } from "drizzle-seed";
import { statuses } from "./db/schema";

async function main() {
  await seed(db, { statuses });
}

main();
