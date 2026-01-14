import { insert } from "@/schemas/validation/insert";
import * as z from "zod";

export type InsertStatus = z.infer<typeof insert.status>;
export type InsertLocationType = z.infer<typeof insert.locationType>;
export type InsertLocation = z.infer<typeof insert.location>;
export type InsertCharacterAlias = z.infer<typeof insert.characterAlias>;
export type InsertSpeciesAlias = z.infer<typeof insert.speciesAlias>;
export type InsertSpecies = z.infer<typeof insert.species>;
export type InsertMap = z.infer<typeof insert.map>;
export type InsertRelativeType = z.infer<typeof insert.relativeType>;
export type InsertRelative = z.infer<typeof insert.relative>;
export type InsertContract = z.infer<typeof insert.contract>;
export type InsertCharacter = z.infer<typeof insert.character>;
export type InsertCharacterAffiliation = z.infer<
  typeof insert.characterAffiliation
>;
export type InsertAffiliation = z.infer<typeof insert.affiliation>;
export type InsertCharacterOccupation = z.infer<
  typeof insert.characterOccupation
>;
export type InsertOccupation = z.infer<typeof insert.occupation>;
