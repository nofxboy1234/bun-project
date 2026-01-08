import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { treaty } from "@elysiajs/eden";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

import { select } from "@/schemas/select";
import { insert } from "@/schemas/insert";
import { update } from "@/schemas/update";
import * as z from "zod";

import {
  deleteLocation,
  getLocation,
  getLocations,
  insertLocation,
  updateLocation,
} from "@/queries/locations";
import { getLocationTypes } from "@/queries/locationTypes";

export const app = new Elysia({
  name: "api",
  prefix: "/api/v1",
})
  .use(openapi())
  .get("/location-types", async () => await getLocationTypes(), {
    response: { 200: z.array(select.locationType) },
  })
  .get("/locations", async () => await getLocations(), {
    response: { 200: z.array(select.location) },
  })
  .post(
    "/locations",
    async ({ body, status }) => {
      const location = await insertLocation(body);

      if (!location) {
        return status(500, "Failed to create location");
      }

      return location;
    },
    {
      body: insert.location,
      response: {
        200: select.location,
        500: z.string(),
      },
    },
  )
  .get(
    "/locations/:id",
    async ({ params: { id }, status }) => {
      const location = await getLocation(id);

      if (!location) {
        return status(404, "Not Found");
      }

      return location;
    },
    {
      params: z.object({
        id: z.coerce.number({ error: "Id must be numeric" }).int().positive(),
      }),
      response: {
        200: select.location,
        404: z.string(),
      },
    },
  )
  .patch(
    "/locations/:id",
    async ({ params: { id }, body, status }) => {
      const location = await updateLocation(id, body);

      if (!location) {
        return status(500, "Failed to update location");
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
        500: z.string(),
      },
    },
  )
  .delete(
    "/locations/:id",
    async ({ params: { id }, status }) => {
      const location = await deleteLocation(id);

      if (!location) {
        return status(500, "Failed to delete location");
      }

      return location;
    },
    {
      params: z.object({
        id: z.coerce.number({ error: "Id must be numeric" }).int().positive(),
      }),
      response: {
        200: select.location,
        500: z.string(),
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
