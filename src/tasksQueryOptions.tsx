import { queryOptions } from "@tanstack/react-query";
import { api } from "./routes/api.v1.$";

export const tasksQueryOptions = queryOptions({
  queryKey: ["tasks"],
  queryFn: async () => {
    const { data: result, error } = await api().v1.tasks.get();

    if (error) throw error.value;

    return result.tasks;
  },
});
