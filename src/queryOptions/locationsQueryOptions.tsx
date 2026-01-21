import { queryOptions } from "@tanstack/react-query";
import { api } from "../routes/api.v1.$";

export const locationsQueryOptions = () =>
  queryOptions({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await api().v1.locations.get();

      if (error) throw error.value;

      return data;
    },
  });
