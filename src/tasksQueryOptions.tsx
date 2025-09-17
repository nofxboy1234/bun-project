import { queryOptions } from "@tanstack/react-query";
import type { Task } from "./types";

export const tasksQueryOptions = queryOptions<Task[]>({
  queryKey: ["tasks"],
  queryFn: () => fetch("/api/tasks").then((r) => r.json()),
});
