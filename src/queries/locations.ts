import { db } from "@/db";
import { createServerOnlyFn } from "@tanstack/react-start";

export const getLocations = createServerOnlyFn(
  async () => await db.query.locations.findMany(),
);
