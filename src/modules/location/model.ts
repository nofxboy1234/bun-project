import { locations } from "@/db/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";

export namespace Location {
  export const insert = createInsertSchema(locations);
  export type insert = typeof insert.static;

  export const update = createUpdateSchema(locations);
  export type update = typeof update.static;

  export const select = createSelectSchema(locations);
  export type select = typeof select.static;
}
