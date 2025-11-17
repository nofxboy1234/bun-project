import { queryOptions } from "@tanstack/react-query";
import { treaty } from "@elysiajs/eden";
import type { Api } from "@/index";
import { notFound } from "@tanstack/react-router";

const client = treaty<Api>("localhost:3000");

export const taskQueryOptions = (taskId: number) =>
  queryOptions({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await client.api.v1.tasks({ id: taskId }).get();

      if (!res.response.ok) {
        throw notFound();
      }

      return res.data;
    },
  });
