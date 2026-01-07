import * as schema from "@/db/schema";
import { createUpdateSchema } from "drizzle-zod";

export const update = {
  status: createUpdateSchema(schema.statuses),
  locationType: createUpdateSchema(schema.locationTypes),
  location: createUpdateSchema(schema.locations),
  characterAlias: createUpdateSchema(schema.characterAliases),
  speciesAlias: createUpdateSchema(schema.speciesAliases),
  species: createUpdateSchema(schema.species),
  map: createUpdateSchema(schema.maps),
  relativeType: createUpdateSchema(schema.relativeTypes),
  relative: createUpdateSchema(schema.relatives),
  contract: createUpdateSchema(schema.contracts),
  character: createUpdateSchema(schema.characters),
  characterAffiliation: createUpdateSchema(schema.characterAffiliations),
  affiliation: createUpdateSchema(schema.affiliations),
  characterOccupation: createUpdateSchema(schema.characterOccupations),
  occupation: createUpdateSchema(schema.occupations),
};
