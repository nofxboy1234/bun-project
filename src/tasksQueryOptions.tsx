import { queryOptions } from "@tanstack/react-query";
import type { Task } from "./types";
import { treaty } from "@elysiajs/eden";
import type { Api } from "@/index";

const client = treaty<Api>("localhost:3000");

export const tasksQueryOptions = queryOptions<Task[] | null>({
  queryKey: ["tasks"],
  queryFn: async () => (await client.api.v1.tasks.get()).data,
});
