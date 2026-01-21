import { db } from "@/db";
import * as schema from "@/db/schema";
import { createServerOnlyFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { LocationModel } from "./model";

export abstract class LocationQuery {
  static getAll = createServerOnlyFn(async () => {
    return await db.query.locations.findMany();
  });

  static insert = createServerOnlyFn(async (data: LocationModel.insert) => {
    const [location] = await db
      .insert(schema.locations)
      .values(data)
      .returning();

    return location;
  });

  static getById = createServerOnlyFn(async (id: number) => {
    const [location] = await db
      .select()
      .from(schema.locations)
      .where(eq(schema.locations.id, id));

    return location;
  });

  static update = createServerOnlyFn(
    async (id: number, data: LocationModel.update) => {
      const [location] = await db
        .update(schema.locations)
        .set(data)
        .where(eq(schema.locations.id, id))
        .returning();

      return location;
    },
  );

  static delete = createServerOnlyFn(async (id: number) => {
    const [location] = await db
      .delete(schema.locations)
      .where(eq(schema.locations.id, id))
      .returning();

    return location;
  });
}
