import { db } from "@/db";
import * as schema from "@/db/schema";
import { createServerOnlyFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { InsertLocation } from "@/types/insert";
import { UpdateLocation } from "@/types/update";

export const getLocations = createServerOnlyFn(
  async () => await db.query.locations.findMany(),
);

export const insertLocation = createServerOnlyFn(async (data: InsertLocation) =>
  (await db.insert(schema.locations).values(data).returning()).at(0),
);

export const getLocation = createServerOnlyFn(async (id: number) =>
  (
    await db.select().from(schema.locations).where(eq(schema.locations.id, id))
  ).at(0),
);

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

export const deleteLocation = createServerOnlyFn(async (id: number) =>
  (
    await db
      .delete(schema.locations)
      .where(eq(schema.locations.id, id))
      .returning()
  ).at(0),
);
