import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { treaty } from "@elysiajs/eden";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

import { select } from "@/schemas/validation/typebox/select";
import { insert } from "@/schemas/validation/typebox/insert";
import { update } from "@/schemas/validation/typebox/update";

import {
  deleteLocation,
  getLocation,
  getLocations,
  insertLocation,
  updateLocation,
} from "@/queries/locations";
import { getLocationTypes } from "@/queries/locationTypes";
import { DrizzleQueryError } from "drizzle-orm";
import { drizzle } from "@/schemas/errors/drizzle";

export const app = new Elysia({
  name: "api",
  prefix: "/api/v1",
})
  .use(openapi())
  .error({
    DrizzleQueryError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "DrizzleQueryError":
        set.status = 500;

        return {
          name: error.name,
          query: error.query,
          message: error.cause?.message,
        };
    }
  })
  .get("/location-types", async () => await getLocationTypes(), {
    response: { 200: t.Array(select.locationType) },
  })
  .get("/locations", async () => await getLocations(), {
    response: { 200: t.Array(select.location) },
  })
  .post(
    "/locations",
    async ({ body }) => {
      console.log("### post /locations handler");
      return await insertLocation(body);
    },
    {
      body: insert.location,
      response: {
        500: drizzle.DrizzleQueryError,
        200: select.location,
      },
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
        200: select.location,
        404: t.Object({
          success: t.Boolean(),
          error: t.String(),
        }),
      },
    },
  )
  .patch(
    "/locations/:id",
    async ({ params: { id }, body, set }) => {
      const location = await updateLocation(id, body);

      if (!location) {
        set.status = 500;
        return { success: false, error: "Failed to update location" };
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: update.location,
      response: {
        200: select.location,
        500: t.Object({ success: t.Boolean(), error: t.String() }),
      },
    },
  )
  .delete(
    "/locations/:id",
    async ({ params: { id }, set }) => {
      const location = await deleteLocation(id);

      if (!location) {
        set.status = 500;
        return { success: false, error: "Failed to delete location" };
      }

      return location;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        200: select.location,
        500: t.Object({ success: t.Boolean(), error: t.String() }),
      },
    },
  );

const handle = ({ request }: { request: Request }) => {
  console.log(`${request.method} ${request.url}`);

  return app.fetch(request);
};

export const Route = createFileRoute("/api/v1/$")({
  server: {
    handlers: {
      ANY: handle,
    },
  },
});

export const api = createIsomorphicFn()
  .server(() => treaty(app).api)
  .client(() => treaty<typeof app>(window.location.origin).api);
