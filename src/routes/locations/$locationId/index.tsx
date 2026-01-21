import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { locationQueryOptions } from "@/queryOptions/locationQueryOptions";

export const Route = createFileRoute("/locations/$locationId/")({
  loader: ({ context: { queryClient }, params: { locationId } }) => {
    queryClient.ensureQueryData({
      ...locationQueryOptions(Number(locationId)),
      revalidateIfStale: true,
    });
  },
  component: LocationDetailComponent,
});

function LocationDetailComponent() {
  const params = Route.useParams();
  const { data: location } = useSuspenseQuery(
    locationQueryOptions(Number(params.locationId)),
  );

  return (
    <div>
      <h2>{location.name}</h2>
      <p>Created At: {new Date(location.createdAt!).toLocaleString()}</p>
      <Link to="/">Back to Locations</Link>
    </div>
  );
}
