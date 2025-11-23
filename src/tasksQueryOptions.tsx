import { queryOptions } from "@tanstack/react-query";
import { api } from "./routes/api.v1.$";

export const tasksQueryOptions = queryOptions({
  queryKey: ["tasks"],
  queryFn: async () => (await api().v1.tasks.get()).data,
});
