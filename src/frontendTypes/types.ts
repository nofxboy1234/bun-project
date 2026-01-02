import { createInsertSchema } from "drizzle-zod";
import { createInsertSchema as createTypeboxInsertSchema } from "drizzle-typebox";
import { Value } from "@sinclair/typebox/value";

import * as schema from "@/db/schema";
import { Type } from "@sinclair/typebox";

const affiliation = { name: "Public Safety" };
const affiliationInsertSchema = createInsertSchema(schema.affiliations);
const parsed = affiliationInsertSchema.parse(affiliation);

const affiliation2 = { name: "Public Safety" };
const affiliationTypeboxInsertSchema = createTypeboxInsertSchema(
  schema.affiliations,
);
const parsed2 = Value.Parse(affiliationTypeboxInsertSchema, affiliation2);

const character = {
  name: "dylan",
  speciesId: 2,
  genderId: 3,
  birthplaceId: 999,
  statusId: "1",
};
const characterTypeboxInsertSchema = createTypeboxInsertSchema(
  schema.characters,
  {
    statusId: Type.Integer(),
  },
);
try {
  const parsed3 = Value.Parse(characterTypeboxInsertSchema, character);
  console.log("Parsed character:", parsed3);
} catch (e) {
  console.error("Validation failed:", e);
}
