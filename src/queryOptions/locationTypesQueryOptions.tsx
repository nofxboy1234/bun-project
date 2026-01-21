import { queryOptions } from "@tanstack/react-query";
import { api } from "../routes/api.v1.$";

export const locationTypesQueryOptions = () =>
  queryOptions({
    queryKey: ["locationTypes"],
    queryFn: async () => {
      const { data, error } = await api().v1["location-types"].get();

      if (error) throw error.value;

      return data;
    },
  });
