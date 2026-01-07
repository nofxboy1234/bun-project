import { select } from "@/schemas/select";
import * as z from "zod";

export type SelectStatus = z.infer<typeof select.status>;
export type SelectLocationType = z.infer<typeof select.locationType>;
export type SelectLocation = z.infer<typeof select.location>;
export type SelectCharacterAlias = z.infer<typeof select.characterAlias>;
export type SelectSpeciesAlias = z.infer<typeof select.speciesAlias>;
export type SelectSpecies = z.infer<typeof select.species>;
export type SelectMap = z.infer<typeof select.map>;
export type SelectRelativeType = z.infer<typeof select.relativeType>;
export type SelectRelative = z.infer<typeof select.relative>;
export type SelectContract = z.infer<typeof select.contract>;
export type SelectCharacter = z.infer<typeof select.character>;
export type SelectCharacterAffiliation = z.infer<typeof select.characterAffiliation>;
export type SelectAffiliation = z.infer<typeof select.affiliation>;
export type SelectCharacterOccupation = z.infer<typeof select.characterOccupation>;
export type SelectOccupation = z.infer<typeof select.occupation>;
