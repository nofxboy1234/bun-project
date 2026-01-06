import * as schema from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const Status = createInsertSchema(schema.statuses);
export const LocationType = createInsertSchema(schema.locationTypes);
export const Location = createInsertSchema(schema.locations);
export const CharacterAlias = createInsertSchema(schema.characterAliases);
export const SpeciesAlias = createInsertSchema(schema.speciesAliases);
export const Species = createInsertSchema(schema.species);
export const Map = createInsertSchema(schema.maps);
export const RelativeType = createInsertSchema(schema.relativeTypes);
export const Relative = createInsertSchema(schema.relatives);
export const Contract = createInsertSchema(schema.contracts);
export const Character = createInsertSchema(schema.characters);
export const CharacterAffiliation = createInsertSchema(
  schema.characterAffiliations,
);
export const Affiliation = createInsertSchema(schema.affiliations);
export const CharacterOccupation = createInsertSchema(
  schema.characterOccupations,
);
export const Occupation = createInsertSchema(schema.occupations);
