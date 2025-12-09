import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { treaty } from "@elysiajs/eden";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";

import { tasks } from "@/db/tasks";

let taskId = 15;

export const app = new Elysia({
  name: "api",
  prefix: "/api/v1",
})
  .use(openapi())
  .get("/", "/api/v1/tasks/")
  .get("/tasks", () => ({
    tasks,
  }))
  .post(
    "/tasks",
    ({ body }) => {
      const task = {
        id: taskId++,
        ...body,
      };

      tasks.push(task);

      return { task };
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

      return { task };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        200: t.Object({
          task: t.Object({
            id: t.Number(),
            title: t.String(),
            description: t.String(),
            deadline: t.Date(),
          }),
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

      return { task };
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
      return { task: tasks.splice(deleteIndex, 1) };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .all("/*", ({ params, status }) => {
    console.log(`Wildcard params: ${params["*"]}`);
    return status(404, "Not Found");
  });

const handle = ({ request }: { request: Request }) => {
  console.log("/api/v1/$ -> passing request to Elysia");
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
  .client(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return treaty<typeof app>(origin).api;
  });
