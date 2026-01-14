import * as schema from "@/db/schema";
import { createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

const refine = {
  createdAt: () => z.coerce.string(),
};

export const update = {
  status: createUpdateSchema(schema.statuses, refine),
  locationType: createUpdateSchema(schema.locationTypes, refine),
  location: createUpdateSchema(schema.locations, refine),
  characterAlias: createUpdateSchema(schema.characterAliases, refine),
  speciesAlias: createUpdateSchema(schema.speciesAliases, refine),
  species: createUpdateSchema(schema.species, refine),
  map: createUpdateSchema(schema.maps, refine),
  relativeType: createUpdateSchema(schema.relativeTypes, refine),
  relative: createUpdateSchema(schema.relatives, refine),
  contract: createUpdateSchema(schema.contracts, refine),
  character: createUpdateSchema(schema.characters, refine),
  characterAffiliation: createUpdateSchema(
    schema.characterAffiliations,
    refine,
  ),
  affiliation: createUpdateSchema(schema.affiliations, refine),
  characterOccupation: createUpdateSchema(schema.characterOccupations, refine),
  occupation: createUpdateSchema(schema.occupations, refine),
};
