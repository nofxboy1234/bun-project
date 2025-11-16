import { queryOptions } from "@tanstack/react-query";
import type { Task } from "./types";

export const tasksQueryOptions = queryOptions<Task[]>({
  queryKey: ["tasks"],
  queryFn: () => fetch("/api/v1/tasks").then((r) => r.json()),
});
