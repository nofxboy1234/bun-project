import {
  characters,
  genders,
  locations,
  locationTypes,
  species,
  statuses,
  relativeTypes,
  affiliations,
  occupations,
} from "@/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CharacterSelectModel = InferSelectModel<typeof characters>;
export type GenderSelectModel = InferSelectModel<typeof genders>;
export type LocationSelectModel = InferSelectModel<typeof locations>;
export type LocationTypeSelectModel = InferSelectModel<typeof locationTypes>;
export type SpeciesSelectModel = InferSelectModel<typeof species>;
export type StatusSelectModel = InferSelectModel<typeof statuses>;
export type RelativeTypeSelectModel = InferSelectModel<typeof relativeTypes>;
export type AffiliationSelectModel = InferSelectModel<typeof affiliations>;
export type OccupationSelectModel = InferSelectModel<typeof occupations>;

export type CharacterInsertModel = InferInsertModel<typeof characters>;
export type GenderInsertModel = InferInsertModel<typeof genders>;
export type LocationInsertModel = InferInsertModel<typeof locations>;
export type LocationTypeInsertModel = InferInsertModel<typeof locationTypes>;
export type SpeciesInsertModel = InferInsertModel<typeof species>;
export type StatusInsertModel = InferInsertModel<typeof statuses>;
export type RelativeTypeInsertModel = InferInsertModel<typeof relativeTypes>;
export type AffiliationInsertModel = InferInsertModel<typeof affiliations>;
export type OccupationInsertModel = InferInsertModel<typeof occupations>;

export type CharacterUpdateModel = Partial<CharacterInsertModel>;
export type GenderUpdateModel = Partial<GenderInsertModel>;
export type LocationUpdateModel = Partial<LocationInsertModel>;
export type LocationTypeUpdateMode = Partial<LocationTypeInsertModel>;
export type SpeciesUpdateModel = Partial<SpeciesInsertModel>;
export type StatusUpdateModel = Partial<StatusInsertModel>;
export type RelativeTypeUpdateModel = Partial<RelativeTypeInsertModel>;
export type AffiliationUpdateModel = Partial<AffiliationInsertModel>;
export type OccupationUpdateModel = Partial<OccupationInsertModel>;

export type TableData = {
  table: string;
  data: Array<{
    [key: string]: (() => string | number | null) | null | number;
  }>;
};

export type Task = {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
};
