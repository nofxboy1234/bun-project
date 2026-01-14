import { select } from "@/schemas/validation/typebox/select";

export type SelectStatus = typeof select.status.static;
export type SelectLocationType = typeof select.locationType.static;
export type SelectLocation = typeof select.location.static;
export type SelectCharacterAlias = typeof select.characterAlias.static;
export type SelectSpeciesAlias = typeof select.speciesAlias.static;
export type SelectSpecies = typeof select.species.static;
export type SelectMap = typeof select.map.static;
export type SelectRelativeType = typeof select.relativeType.static;
export type SelectRelative = typeof select.relative.static;
export type SelectContract = typeof select.contract.static;
export type SelectCharacter = typeof select.character.static;
export type SelectCharacterAffiliation =
  typeof select.characterAffiliation.static;
export type SelectAffiliation = typeof select.affiliation.static;
export type SelectCharacterOccupation =
  typeof select.characterOccupation.static;
export type SelectOccupation = typeof select.occupation.static;
