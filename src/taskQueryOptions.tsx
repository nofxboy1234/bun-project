import { queryOptions } from "@tanstack/react-query";
import type { Task } from "./types";

export const taskQueryOptions = (taskId: number) =>
  queryOptions<Task>({
    queryKey: ["tasks", taskId],
    queryFn: () => fetch(`/api/v1/tasks/${taskId}`).then((r) => r.json()),
  });
