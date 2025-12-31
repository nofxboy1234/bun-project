import { createInsertSchema } from "drizzle-zod";
import { createInsertSchema as createTypeboxInsertSchema } from "drizzle-typebox";
import { Value } from "@sinclair/typebox/value";

import * as schema from "@/db/schema";

const affiliation = { name: "Public Safety" };
const affiliationInsertSchema = createInsertSchema(schema.affiliations);
const parsed = affiliationInsertSchema.parse(affiliation);

const affiliation2 = { name: "Public Safety" };
const affiliationTypeboxInsertSchema = createTypeboxInsertSchema(
  schema.affiliations,
);
const parsed2 = Value.Parse(affiliationTypeboxInsertSchema, affiliation2);
