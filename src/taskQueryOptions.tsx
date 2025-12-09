import { queryOptions } from "@tanstack/react-query";
import { api } from "./routes/api.v1.$";

export const taskQueryOptions = (taskId: number) =>
  queryOptions({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data: result, error } = await api()
        .v1.tasks({ id: taskId })
        .get();

      if (error) throw error.value;

      return result.task;
    },
  });
