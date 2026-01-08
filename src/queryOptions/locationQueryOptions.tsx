import { queryOptions } from "@tanstack/react-query";
import { api } from "../routes/api.v1.$";

export const locationQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["locations", id],
    queryFn: async () => {
      const { data, error } = await api().v1.locations({ id }).get();

      if (error) throw error.value;

      return data;
    },
  });
