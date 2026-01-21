import { locations } from "@/db/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-typebox";
import { t } from "elysia";

export namespace LocationModel {
  export const insert = createInsertSchema(locations);
  export type insert = typeof insert.static;

  export const update = createUpdateSchema(locations);
  export type update = typeof update.static;

  export const select = createSelectSchema(locations);
  export type select = typeof select.static;

  export const validationError = t.Object({
    name: t.String(),
    errors: t.Array(
      t.Object({
        path: t.String(),
        value: t.Unknown(),
        message: t.String(),
      }),
    ),
    message: t.Optional(t.String()),
  });

  export const queryError = t.Object({
    name: t.String(),
    query: t.String(),
    message: t.Optional(t.String()),
  });
}
