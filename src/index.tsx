import { serve, sleep } from "bun";
import index from "./index.html";
import { tasks } from "./tasks";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/tasks": {
      async GET() {
        await sleep(3000);
        return Response.json(tasks);
      },
      async POST(req) {
        const task = await req.json();
        task.id = tasks.length;
        tasks.push(task);
        return Response.json(task);
      },
    },

    "/api/tasks/:id": {
      async GET(req) {
        const { id } = req.params;
        const task = tasks.at(Number(id));
        return Response.json(task);
      },
      async PATCH(req) {
        const updatedTaskData = await req.json();
        const task = tasks.at(updatedTaskData.id);
        const updatedTask = { ...task, ...updatedTaskData };
        return Response.json({ updated: true, ...updatedTask });
      },
      async DELETE(req) {
        const { id } = req.params;
        const deletedTask = tasks.splice(Number(id), 1);
        return Response.json({ deleted: true, ...deletedTask });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: false,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
