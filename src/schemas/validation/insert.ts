import * as schema from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const refine = {
  createdAt: () => z.coerce.string(),
};

export const insert = {
  status: createInsertSchema(schema.statuses, refine),
  locationType: createInsertSchema(schema.locationTypes, refine),
  location: createInsertSchema(schema.locations, refine),
  characterAlias: createInsertSchema(schema.characterAliases, refine),
  speciesAlias: createInsertSchema(schema.speciesAliases, refine),
  species: createInsertSchema(schema.species, refine),
  map: createInsertSchema(schema.maps, refine),
  relativeType: createInsertSchema(schema.relativeTypes, refine),
  relative: createInsertSchema(schema.relatives, refine),
  contract: createInsertSchema(schema.contracts, refine),
  character: createInsertSchema(schema.characters, refine),
  characterAffiliation: createInsertSchema(schema.characterAffiliations, refine),
  affiliation: createInsertSchema(schema.affiliations, refine),
  characterOccupation: createInsertSchema(schema.characterOccupations, refine),
  occupation: createInsertSchema(schema.occupations, refine),
};