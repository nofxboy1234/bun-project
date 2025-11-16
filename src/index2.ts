import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import index from "./index.html";
import { tasks } from "./tasks";
import type { Task } from "./types";

let taskId = 15;

const api = new Elysia({
  prefix: "/api/v1",
  name: "api",
})
  .use(openapi())
  .get("/tasks", () => tasks)
  .post("/tasks", async ({ request }) => {
    const formData = await request.formData();

    const task: Task = {
      id: taskId++,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      deadline: new Date(formData.get("deadline") as string),
    };

    tasks.push(task);
    return task;
  })
  .get("/tasks/:id", ({ params: { id } }) => {
    const task = tasks.find((task) => task.id === Number(id));
    return task;
  })
  .patch("/tasks/:id", async ({ request }) => {
    const formData = await request.formData();

    const taskId = formData.get("id") as string;
    const task = tasks.find((task) => task.id === Number(taskId));

    const updatedTask: Task = {
      id: Number(taskId),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      deadline: new Date(formData.get("deadline") as string),
    };

    Object.assign(task!, updatedTask);
    return { updated: true, ...task };
  })
  .delete("/tasks/:id", ({ params: { id } }) => {
    const deleteIndex = tasks.findIndex((task) => task.id === Number(id));
    const deletedTask = tasks.splice(deleteIndex, 1);
    return { deleted: true, ...deletedTask };
  });

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
  .get("/", index)
  .use(api)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

export type App = typeof app;
