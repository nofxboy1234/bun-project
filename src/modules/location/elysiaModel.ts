import Elysia from "elysia";
import { LocationModel } from "./model";

export const LocationElysiaModel = new Elysia().model({
  insert: LocationModel.insert,
  update: LocationModel.update,
  select: LocationModel.select,
  queryError: LocationModel.queryError,
  validationError: LocationModel.validationError,
});
