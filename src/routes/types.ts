import { createInsertSchema } from "drizzle-zod";
import * as schema from "@/db/schema";

const affiliationInsertSchema = createInsertSchema(schema.affiliations);

const affiliation = { name: "Public Safety" };
const parsed = affiliationInsertSchema.parse(affiliation);
