import Elysia, { t } from "elysia";
// import {
//   _insertLocation,
//   _selectLocation,
//   _updateLocation,
// } from "./drizzleSchemas";

import { LocationModel } from "./model";

export const LocationElysiaModel = new Elysia().model({
  insert: LocationModel.insert,
  update: LocationModel.update,
  select: LocationModel.select,
  queryError: t.Object({
    name: t.String(),
    query: t.String(),
    message: t.Optional(t.String()),
  }),
});
