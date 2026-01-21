import { Elysia, t, ValidationError } from "elysia";

import {
  deleteLocation,
  getLocation,
  getLocations,
  updateLocation,
} from "@/queries/locations";
import { DrizzleQueryError } from "drizzle-orm";

import { LocationModel } from "@/modules/location/model";
import { LocationQuery } from "@/modules/location/query";
import { LocationElysiaModel } from "@/modules/location/elysiaModel";

export const locationApi = new Elysia({
  name: "locations",
})
  .use(LocationElysiaModel)
  .prefix("model", "location.")
  .get("/locations", async () => await getLocations(), {
    response: { 200: t.Array(LocationModel.select) },
  })
  .guard({
    response: {
      422: "location.ValidationError",
      500: "location.QueryError",
      200: "location.Select",
    },
    error({ error, status }) {
      if (error instanceof DrizzleQueryError) {
        return status(500, {
          name: error.name,
          query: error.query,
          message: error.cause?.message,
        });
      } else if (error instanceof ValidationError) {
        return status(422, {
          name: "ValidationError",
          errors: error.all.map((e) => ({
            path: e.path,
            value: e.value,
            message: e.message,
          })),
        });
      }
    },
  })
  .post(
    "/locations",
    async ({ body }) => {
      return await LocationQuery.insert(body);
    },
    {
      body: LocationModel.insert,
    },
  )
  .get(
    "/locations/:id",
    async ({ params: { id }, set }) => {
      const location = await getLocation(id);

      if (!location) {
        console.log("get /locations/:id - not found");

        set.status = 404;
        return { success: false, error: "Not Found" };
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        404: t.Object({
          success: t.Boolean(),
          error: t.String(),
        }),
      },
    },
  )
  .patch(
    "/locations/:id",
    async ({ params: { id }, body }) => {
      const location = await updateLocation(id, body);

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: LocationModel.update,
    },
  )
  .delete(
    "/locations/:id",
    async ({ params: { id } }) => {
      const location = await deleteLocation(id);

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  );
