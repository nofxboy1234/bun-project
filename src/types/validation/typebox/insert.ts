import { insert } from "@/schemas/validation/typebox/insert";

export type InsertStatus = typeof insert.status.static;
export type InsertLocationType = typeof insert.locationType.static;
export type InsertLocation = typeof insert.location.static;
export type InsertCharacterAlias = typeof insert.characterAlias.static;
export type InsertSpeciesAlias = typeof insert.speciesAlias.static;
export type InsertSpecies = typeof insert.species.static;
export type InsertMap = typeof insert.map.static;
export type InsertRelativeType = typeof insert.relativeType.static;
export type InsertRelative = typeof insert.relative.static;
export type InsertContract = typeof insert.contract.static;
export type InsertCharacter = typeof insert.character.static;
export type InsertCharacterAffiliation =
  typeof insert.characterAffiliation.static;
export type InsertAffiliation = typeof insert.affiliation.static;
export type InsertCharacterOccupation =
  typeof insert.characterOccupation.static;
export type InsertOccupation = typeof insert.occupation.static;
