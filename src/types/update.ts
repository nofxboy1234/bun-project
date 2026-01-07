import { update } from "@/schemas/update";
import * as z from "zod";

export type UpdateStatus = z.infer<typeof update.status>;
export type UpdateLocationType = z.infer<typeof update.locationType>;
export type UpdateLocation = z.infer<typeof update.location>;
export type UpdateCharacterAlias = z.infer<typeof update.characterAlias>;
export type UpdateSpeciesAlias = z.infer<typeof update.speciesAlias>;
export type UpdateSpecies = z.infer<typeof update.species>;
export type UpdateMap = z.infer<typeof update.map>;
export type UpdateRelativeType = z.infer<typeof update.relativeType>;
export type UpdateRelative = z.infer<typeof update.relative>;
export type UpdateContract = z.infer<typeof update.contract>;
export type UpdateCharacter = z.infer<typeof update.character>;
export type UpdateCharacterAffiliation = z.infer<typeof update.characterAffiliation>;
export type UpdateAffiliation = z.infer<typeof update.affiliation>;
export type UpdateCharacterOccupation = z.infer<typeof update.characterOccupation>;
export type UpdateOccupation = z.infer<typeof update.occupation>;
