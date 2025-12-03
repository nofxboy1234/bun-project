import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Task } from "@/components/Task";
import { taskQueryOptions } from "@/taskQueryOptions";

export const Route = createFileRoute("/tasks/$taskId/")({
  loader: ({ context: { queryClient }, params: { taskId } }) => {
    queryClient.ensureQueryData({
      ...taskQueryOptions(Number(taskId)),
      revalidateIfStale: true,
    });
  },
  component: RouteComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on /tasks/$taskId</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
  pendingComponent: () => {
    return <div>pending!</div>;
  },
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery({
    ...taskQueryOptions(Number(taskId)),
  });

  return <Task task={task!} />;
}
