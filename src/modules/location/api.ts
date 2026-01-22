import { Elysia, t, ValidationError } from "elysia";

import { DrizzleQueryError } from "drizzle-orm";

import { LocationModel } from "@/modules/location/model";
import { LocationQuery } from "@/modules/location/query";

export const locationApi = new Elysia({
  name: "locations",
})
  .guard({
    response: {
      422: LocationModel.validationError,
      500: LocationModel.queryError,
    },
    error({ error, status }) {
      if (error instanceof ValidationError) {
        return status(422, {
          name: "ValidationError",
          errors: error.all.map((e) => ({
            path: e.path,
            value: e.value,
            message: e.message,
          })),
        });
      } else if (error instanceof DrizzleQueryError) {
        return status(500, {
          name: error.name,
          query: error.query,
          message: error.cause?.message,
        });
      }
    },
  })
  .get("/locations", async () => await LocationQuery.getAll(), {
    response: {
      200: t.Array(LocationModel.select),
    },
  })
  .post("/locations", async ({ body }) => await LocationQuery.insert(body), {
    body: LocationModel.insert,
    response: {
      200: LocationModel.select,
    },
  })
  .get(
    "/locations/:id",
    async ({ params: { id }, status }) => {
      const location = await LocationQuery.getById(id);

      if (!location) {
        return status(404, {
          name: "NotFoundError",
          message: `location with id=${id} was not found`,
        });
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        404: t.Object({
          name: t.String(),
          message: t.String(),
        }),
        200: LocationModel.select,
      },
    },
  )
  .patch(
    "/locations/:id",
    async ({ params: { id }, body, status }) => {
      const location = await LocationQuery.update(id, body);

      if (!location) {
        return status(404, {
          name: "NotFoundError",
          message: `location with id=${id} was not found`,
        });
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: LocationModel.update,
      response: {
        404: t.Object({
          name: t.String(),
          message: t.String(),
        }),
        200: LocationModel.select,
      },
    },
  )
  .delete(
    "/locations/:id",
    async ({ params: { id }, status }) => {
      const location = await LocationQuery.delete(id);

      if (!location) {
        return status(404, {
          name: "NotFoundError",
          message: `location with id=${id} was not found`,
        });
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        404: t.Object({
          name: t.String(),
          message: t.String(),
        }),
        200: LocationModel.select,
      },
    },
  );
