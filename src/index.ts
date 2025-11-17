import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";
import index from "./index.html";
import { tasks } from "./tasks";

let taskId = 15;

const api = new Elysia({
  prefix: "/api/v1",
  name: "api",
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
  .use(spa)
  .use(api)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

export type Api = typeof api;
