import { Elysia, t } from "elysia";

import { select } from "@/schemas/validation/typebox/select";
import { getLocationTypes } from "@/queries/locationTypes";

export const locationTypeApi = new Elysia({
  name: "locationTypes",
}).get("/location-types", async () => await getLocationTypes(), {
  response: { 200: t.Array(select.locationType) },
});
