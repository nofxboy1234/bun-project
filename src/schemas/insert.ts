import * as schema from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insert = {
  status: createInsertSchema(schema.statuses),
  locationType: createInsertSchema(schema.locationTypes),
  location: createInsertSchema(schema.locations),
  characterAlias: createInsertSchema(schema.characterAliases),
  speciesAlias: createInsertSchema(schema.speciesAliases),
  species: createInsertSchema(schema.species),
  map: createInsertSchema(schema.maps),
  relativeType: createInsertSchema(schema.relativeTypes),
  relative: createInsertSchema(schema.relatives),
  contract: createInsertSchema(schema.contracts),
  character: createInsertSchema(schema.characters),
  characterAffiliation: createInsertSchema(schema.characterAffiliations),
  affiliation: createInsertSchema(schema.affiliations),
  characterOccupation: createInsertSchema(schema.characterOccupations),
  occupation: createInsertSchema(schema.occupations),
};
