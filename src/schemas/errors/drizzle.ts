import { t } from "elysia";

export const drizzle = {
  DrizzleQueryError: t.Object({
    name: t.String(),
    query: t.String(),
    message: t.Optional(t.String()),
  }),
};
