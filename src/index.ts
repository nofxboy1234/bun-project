import { serve, type BunRequest } from "bun";
import index from "./index.html";

import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

import { tasks } from "./tasks";

let taskId = 15;

const api = new Elysia({
  name: "api",
  prefix: "/api/v1",
})
  .use(openapi())
  .get("/tasks", () => tasks)
  .post(
    "/tasks",
    ({ body }) => {
      const task = {
        id: taskId++,
        ...body,
      };

      tasks.push(task);
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        deadline: t.Date(),
      }),
    },
  )
  .all("/tasks/*", ({ params, status }) => {
    console.log(`Wildcard route matched: ${params["*"]}`);
    return status(404, "Not Found");
  })
  .get(
    "/tasks/:id",
    ({ params: { id }, status }) => {
      const task = tasks.find((task) => task.id === id);

      if (!task) {
        return status(404, "Not Found");
      }

      return task;
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        200: t.Object({
          id: t.Number(),
          title: t.String(),
          description: t.String(),
          deadline: t.Date(),
        }),
        404: t.String(),
      },
    },
  )
  .patch(
    "/tasks/:id",
    ({ params: { id }, body }) => {
      const task = tasks.find((task) => task.id === id);
      Object.assign(task!, body);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      body: t.Object({
        title: t.String(),
        description: t.String(),
        deadline: t.Date(),
      }),
    },
  )
  .delete(
    "/tasks/:id",
    ({ params: { id } }) => {
      const deleteIndex = tasks.findIndex((task) => task.id === id);
      tasks.splice(deleteIndex, 1);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  );

const spa = new Elysia({
  name: "spa",
}).get("/*", index);

const app = new Elysia({
  name: "app",
  aot: true,
  nativeStaticResponse: true,
  serve: {
    development: process.env.NODE_ENV !== "production" && {
      hmr: false,
      console: true,
    },
  },
})
  .use(api)
  .use(spa);
// .listen(3000);
// console.log(`🦊 Elysia Server is running at ${app.server?.url}`);

const handle = ({ request }: { request: BunRequest }) => api.fetch(request);

const server = serve({
  routes: {
    "/*": index,
    "/api/v1/": (req) => {
      console.log("/api/v1/");
      return handle({ request: req });
      // return new Response("Elysia Server: /api/v1/");
    },
    "/api/v1/*": (req) => {
      console.log("/api/v1/*");
      return handle({ request: req });
      // return new Response("Elysia Server: /api/v1/*");
    },
  },
  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: false,

    // Echo console logs from the browser to the server
    console: true,
  },
});
console.log(`🚀 Bun Server running at ${server.url}`);

export type Api = typeof api;
