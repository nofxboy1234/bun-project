import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { api } from "./routes/api.v1.$";

export const taskQueryOptions = (taskId: number) =>
  queryOptions({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await api().v1.tasks({ id: taskId }).get();

      if (!res.response.ok) {
        throw notFound();
      }

      return res.data;
    },
  });
