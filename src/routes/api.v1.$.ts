import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { treaty } from "@elysiajs/eden";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

import { select } from "@/schemas/validation/select";
import { insert } from "@/schemas/validation/insert";
import { update } from "@/schemas/validation/update";
import * as z from "zod";

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
    response: { 200: z.array(select.locationType) },
  })
  .get("/locations", async () => await getLocations(), {
    response: { 200: z.array(select.location) },
  })
  .post(
    "/locations",
    async ({ body }) => {
      try {
        return await insertLocation(body);
      } catch (error) {
        console.log("### post /locations handler");
        throw error as DrizzleQueryError;
      }
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
      params: z.object({
        id: z.coerce.number({ error: "Id must be numeric" }).int().positive(),
      }),
      response: {
        200: select.location,
        404: z.object({ success: z.boolean(), error: z.string() }),
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
      params: z.object({
        id: z.coerce.number({ error: "Id must be numeric" }).int().positive(),
      }),
      body: update.location,
      response: {
        200: select.location,
        500: z.object({ success: z.boolean(), error: z.string() }),
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
      params: z.object({
        id: z.coerce.number({ error: "Id must be numeric" }).int().positive(),
      }),
      response: {
        200: select.location,
        500: z.object({ success: z.boolean(), error: z.string() }),
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
