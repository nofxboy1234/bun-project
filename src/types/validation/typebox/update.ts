import { update } from "@/schemas/validation/typebox/update";

export type UpdateStatus = typeof update.status.static;
export type UpdateLocationType = typeof update.locationType.static;
export type UpdateLocation = typeof update.location.static;
export type UpdateCharacterAlias = typeof update.characterAlias.static;
export type UpdateSpeciesAlias = typeof update.speciesAlias.static;
export type UpdateSpecies = typeof update.species.static;
export type UpdateMap = typeof update.map.static;
export type UpdateRelativeType = typeof update.relativeType.static;
export type UpdateRelative = typeof update.relative.static;
export type UpdateContract = typeof update.contract.static;
export type UpdateCharacter = typeof update.character.static;
export type UpdateCharacterAffiliation =
  typeof update.characterAffiliation.static;
export type UpdateAffiliation = typeof update.affiliation.static;
export type UpdateCharacterOccupation =
  typeof update.characterOccupation.static;
export type UpdateOccupation = typeof update.occupation.static;
