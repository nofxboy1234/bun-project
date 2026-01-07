import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { locationsQueryOptions } from "@/queryOptions/locationsQueryOptions";

import styles from "@/styles.module.css";

import { LocationPreview } from "@/components/LocationPreview";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      ...locationsQueryOptions,
      revalidateIfStale: true,
    });
  },
  component: TasksLayoutComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on /</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
  pendingComponent: () => {
    return <div>loading index</div>;
  },
});

function TasksLayoutComponent() {
  const { data } = useSuspenseQuery(locationsQueryOptions);

  return (
    <div className={styles.main}>
      <div className={styles.tasksContainer}>
        {data.map((location) => (
          <LocationPreview key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
