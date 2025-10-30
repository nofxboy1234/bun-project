import {
  characters,
  genders,
  locations,
  locationTypes,
  species,
  statuses,
} from "@/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CharacterSelectModel = InferSelectModel<typeof characters>;
export type GenderSelectModel = InferSelectModel<typeof genders>;
export type LocationSelectModel = InferSelectModel<typeof locations>;
export type LocationTypeSelectModel = InferSelectModel<typeof locationTypes>;
export type SpeciesSelectModel = InferSelectModel<typeof species>;
export type StatusSelectModel = InferSelectModel<typeof statuses>;

export type CharacterInsertModel = InferInsertModel<typeof characters>;
export type GenderInsertModel = InferInsertModel<typeof genders>;
export type LocationInsertModel = InferInsertModel<typeof locations>;
export type LocationTypeInsertModel = InferInsertModel<typeof locationTypes>;
export type SpeciesInsertModel = InferInsertModel<typeof species>;
export type StatusInsertModel = InferInsertModel<typeof statuses>;

export type CharacterNewModel = Omit<
  CharacterSelectModel,
  "birthplaceId" | "genderId" | "speciesId" | "statusId"
> & {
  birthplace: LocationSelectModel;
  gender: GenderSelectModel;
  species: SpeciesSelectModel;
  status: StatusSelectModel;
};

export type LocationNewModel = Omit<LocationSelectModel, "locationTypeId"> & {
  locationType: LocationTypeSelectModel;
};

export type CharacterNewInsertModel = Omit<
  CharacterInsertModel,
  "birthplaceId" | "genderId" | "speciesId" | "statusId"
> & {
  birthplace: LocationNewInsertModel;
  gender: GenderInsertModel;
  species: SpeciesInsertModel;
  status: StatusInsertModel;
};

export type LocationNewInsertModel = Omit<
  LocationInsertModel,
  "locationTypeId"
> & {
  locationType: LocationTypeInsertModel;
};

export type CharacterNewUpdateModel = Partial<CharacterNewInsertModel>;
export type LocationNewUpdateModel = Partial<LocationNewInsertModel>;
export type GenderNewUpdateModel = Partial<GenderInsertModel>;
export type SpeciesNewUpdateModel = Partial<SpeciesInsertModel>;
export type StatusNewUpdateModel = Partial<StatusInsertModel>;

export type Task = {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
};
