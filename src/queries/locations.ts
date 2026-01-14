import { db } from "@/db";
import * as schema from "@/db/schema";
import { createServerOnlyFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { InsertLocation } from "@/types/validation/zod/insert";
import { UpdateLocation } from "@/types/validation/zod/update";

export const getLocations = createServerOnlyFn(
  async () => await db.query.locations.findMany(),
);

export const insertLocation = createServerOnlyFn(
  async (data: InsertLocation) => {
    const [location] = await db
      .insert(schema.locations)
      .values(data)
      .returning();

    return location;
  },
);

export const getLocation = createServerOnlyFn(async (id: number) => {
  const [location] = await db
    .select()
    .from(schema.locations)
    .where(eq(schema.locations.id, id));

  return location;
});

export const updateLocation = createServerOnlyFn(
  async (id: number, data: UpdateLocation) => {
    const [location] = await db
      .update(schema.locations)
      .set(data)
      .where(eq(schema.locations.id, id))
      .returning();

    return location;
  },
);

export const deleteLocation = createServerOnlyFn(async (id: number) => {
  const [location] = await db
    .delete(schema.locations)
    .where(eq(schema.locations.id, id))
    .returning();

  return location;
});
