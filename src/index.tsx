import { serve } from "bun";
import index from "./index.html";

const tasks = [
  {
    id: 0,
    title: "Task 0",
    description: "ksdjfkjsdkf",
    deadline: new Date(),
  },
  {
    id: 1,
    title: "Task 1",
    description: "sdlkfjdskjkj",
    deadline: new Date(),
  },
  { id: 2, title: "Task 2", description: "asdfsfsfd", deadline: new Date() },
  {
    id: 3,
    title: "Task 3",
    description: "addfdfdgfgkjkj",
    deadline: new Date(),
  },
  {
    id: 4,
    title: "Task 4",
    description: "sfkljjkjipwiwi",
    deadline: new Date(),
  },
  {
    id: 5,
    title: "Task 5",
    description: "zzzzzzzzzzjdkfjskdf",
    deadline: new Date(),
  },
  {
    id: 6,
    title: "Task 6",
    description: "sdklfjdskikjskjdfksdjkfjskfjdk",
    deadline: new Date(),
  },
  {
    id: 7,
    title: "Task 7",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 8,
    title: "Task 8",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 9,
    title: "Task 9",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 10,
    title: "Task 10",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 11,
    title: "Task 11",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 12,
    title: "Task 12",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 13,
    title: "Task 13",
    description: "the last task!",
    deadline: new Date(),
  },
  {
    id: 14,
    title: "Task 14",
    description: "the last task!",
    deadline: new Date(),
  },
];

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET() {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT() {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/bun": async () => {
      return Response.json({
        message: "bun :)",
      });
    },

    "/api/tasks": async (req) => {
      return Response.json(tasks);
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
