import { db } from "@/db";
import { locationTypes } from "@/db/schema";
import { createServerOnlyFn } from "@tanstack/react-start";

export const getLocationTypes = createServerOnlyFn(
  async () => await db.select().from(locationTypes),
);
