import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { treaty } from "@elysiajs/eden";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { locationApi } from "@/modules/location/api";
import { locationTypeApi } from "@/modules/locationType/api";

export const app = new Elysia({
  name: "api",
  prefix: "/api/v1",
})
  .use(openapi())
  .use(locationApi)
  .use(locationTypeApi);

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
