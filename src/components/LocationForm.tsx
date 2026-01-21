import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../routes/api.v1.$";
import type { ValidationError } from "elysia/error";
import { locationTypesQueryOptions } from "@/queryOptions/locationTypesQueryOptions";
import { Location } from "@/modules/location/model";

const parseFormData = (data: FormData) => {
  const payload = {
    name: data.get("name") as string,
    locationTypeId: Number(data.get("locationTypeId")),
  };

  const id = data.get("id");

  if (id) {
    return {
      id: Number(id),
      ...payload,
    };
  }

  return payload;
};

const saveLocation = async (formData: FormData) => {
  const parsedData = parseFormData(formData);

  let response;

  if ("id" in parsedData) {
    const { id, ...payload } = parsedData;
    response = await api().v1.locations({ id }).patch(payload);
  } else {
    response = await api().v1.locations.post(parsedData);
  }

  const { data, error } = response;

  if (error) {
    switch (error.status) {
      case 422:
        return (error as ValidationError).all;
    }
  }

  return data;
};

export function LocationForm({ location }: { location?: Location.select }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: locationTypes } = useSuspenseQuery(locationTypesQueryOptions);

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        return await saveLocation(data);
      } catch (error) {
        console.log((error as ValidationError).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      navigate({ to: "/" });
    },
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const form = event.currentTarget;
          const formData = new FormData(form);

          saveMutation.mutate(formData);
        }}
      >
        {location && <input type="hidden" name="id" value={location.id} />}
        <div>
          <label htmlFor="location-name">Name</label>
          <input
            type="text"
            id="location-name"
            name="name"
            defaultValue={location?.name ?? ""}
            placeholder="Location Name"
            required
          />
        </div>

        <div>
          <label htmlFor="location-type">Location Type</label>
          <select
            id="location-type"
            name="locationTypeId"
            defaultValue={location?.locationTypeId ?? ""}
            required
          >
            <option value="" disabled>
              Select a type
            </option>
            {locationTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{location ? "Update" : "Create"}</button>
        {saveMutation.isError && (
          <p style={{ color: "red" }}>
            {(saveMutation.error as ValidationError).message}
          </p>
        )}
      </form>
    </div>
  );
}
