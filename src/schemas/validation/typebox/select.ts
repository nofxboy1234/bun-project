import * as schema from "@/db/schema";
import { createSelectSchema } from "drizzle-typebox";

export const select = {
  status: createSelectSchema(schema.statuses),
  locationType: createSelectSchema(schema.locationTypes),
  location: createSelectSchema(schema.locations),
  characterAlias: createSelectSchema(schema.characterAliases),
  speciesAlias: createSelectSchema(schema.speciesAliases),
  species: createSelectSchema(schema.species),
  map: createSelectSchema(schema.maps),
  relativeType: createSelectSchema(schema.relativeTypes),
  relative: createSelectSchema(schema.relatives),
  contract: createSelectSchema(schema.contracts),
  character: createSelectSchema(schema.characters),
  characterAffiliation: createSelectSchema(schema.characterAffiliations),
  affiliation: createSelectSchema(schema.affiliations),
  characterOccupation: createSelectSchema(schema.characterOccupations),
  occupation: createSelectSchema(schema.occupations),
};
