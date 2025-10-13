import { db } from "./db";
import { reset, seed } from "drizzle-seed";
import { statuses } from "@/db/schema";
import * as schema from "@/db/schema";

async function main() {
  await reset(db, schema);
  await seed(db, schema, { seed: 1984 }).refine((f) => ({
    statuses: {
      columns: {
        name: f.valuesFromArray({
          values: ["Dead", "Alive"],
        }),
      },
    },
  }));

  // await reset(db, { statuses });
  // await seed(db, { statuses }, { seed: 1984 });
}

main();
