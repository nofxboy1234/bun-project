import { createFileRoute } from "@tanstack/react-router";
import { LocationForm } from "@/components/LocationForm";
import { locationTypesQueryOptions } from "@/queryOptions/locationTypesQueryOptions";

export const Route = createFileRoute("/locations/new")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      ...locationTypesQueryOptions,
      revalidateIfStale: true,
    });
  },
  component: NewLocationComponent,
});

function NewLocationComponent() {
  return (
    <div>
      <h2>Create New Location</h2>
      <LocationForm />
    </div>
  );
}
