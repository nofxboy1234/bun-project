import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LocationForm } from "@/components/LocationForm";
import { locationQueryOptions } from "@/queryOptions/locationQueryOptions";
import { locationTypesQueryOptions } from "@/queryOptions/locationTypesQueryOptions";

export const Route = createFileRoute("/locations/$locationId/edit")({
  loader: async ({ context: { queryClient }, params: { locationId } }) => {
    const id = Number(locationId);
    await Promise.all([
      queryClient.ensureQueryData({
        ...locationQueryOptions(id),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...locationTypesQueryOptions,
        revalidateIfStale: true,
      }),
    ]);
  },
  component: EditLocationComponent,
});

function EditLocationComponent() {
  const params = Route.useParams();
  const { data: location } = useSuspenseQuery(
    locationQueryOptions(Number(params.locationId)),
  );

  return (
    <div>
      <h2>Edit Location</h2>
      <LocationForm location={location} />
    </div>
  );
}
