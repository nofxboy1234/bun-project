import * as schema from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const Status = createSelectSchema(schema.statuses);
export const LocationType = createSelectSchema(schema.locationTypes);
export const Location = createSelectSchema(schema.locations);
export const CharacterAlias = createSelectSchema(schema.characterAliases);
export const SpeciesAlias = createSelectSchema(schema.speciesAliases);
export const Species = createSelectSchema(schema.species);
export const Map = createSelectSchema(schema.maps);
export const RelativeType = createSelectSchema(schema.relativeTypes);
export const Relative = createSelectSchema(schema.relatives);
export const Contract = createSelectSchema(schema.contracts);
export const Character = createSelectSchema(schema.characters);
export const CharacterAffiliation = createSelectSchema(
  schema.characterAffiliations,
);
export const Affiliation = createSelectSchema(schema.affiliations);
export const CharacterOccupation = createSelectSchema(
  schema.characterOccupations,
);
export const Occupation = createSelectSchema(schema.occupations);
