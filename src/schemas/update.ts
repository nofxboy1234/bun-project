import * as schema from "@/db/schema";
import { createUpdateSchema } from "drizzle-zod";

export const Status = createUpdateSchema(schema.statuses);
export const LocationType = createUpdateSchema(schema.locationTypes);
export const Location = createUpdateSchema(schema.locations);
export const CharacterAlias = createUpdateSchema(schema.characterAliases);
export const SpeciesAlias = createUpdateSchema(schema.speciesAliases);
export const Species = createUpdateSchema(schema.species);
export const Map = createUpdateSchema(schema.maps);
export const RelativeType = createUpdateSchema(schema.relativeTypes);
export const Relative = createUpdateSchema(schema.relatives);
export const Contract = createUpdateSchema(schema.contracts);
export const Character = createUpdateSchema(schema.characters);
export const CharacterAffiliation = createUpdateSchema(
  schema.characterAffiliations,
);
export const Affiliation = createUpdateSchema(schema.affiliations);
export const CharacterOccupation = createUpdateSchema(
  schema.characterOccupations,
);
export const Occupation = createUpdateSchema(schema.occupations);
