import * as schema from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const refine = {
  createdAt: () => z.coerce.string(),
};

export const select = {
  status: createSelectSchema(schema.statuses, refine),
  locationType: createSelectSchema(schema.locationTypes, refine),
  location: createSelectSchema(schema.locations, refine),
  characterAlias: createSelectSchema(schema.characterAliases, refine),
  speciesAlias: createSelectSchema(schema.speciesAliases, refine),
  species: createSelectSchema(schema.species, refine),
  map: createSelectSchema(schema.maps, refine),
  relativeType: createSelectSchema(schema.relativeTypes, refine),
  relative: createSelectSchema(schema.relatives, refine),
  contract: createSelectSchema(schema.contracts, refine),
  character: createSelectSchema(schema.characters, refine),
  characterAffiliation: createSelectSchema(schema.characterAffiliations, refine),
  affiliation: createSelectSchema(schema.affiliations, refine),
  characterOccupation: createSelectSchema(schema.characterOccupations, refine),
  occupation: createSelectSchema(schema.occupations, refine),
};