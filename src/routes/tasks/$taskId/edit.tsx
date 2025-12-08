import { TaskForm } from "@/components/TaskForm";
import { taskQueryOptions } from "@/taskQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskId/edit")({
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
        <p>This is the notFoundComponent configured on /tasks/$taskId/edit</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
  pendingComponent: () => {
    return <div>loading task edit form</div>;
  },
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery({
    ...taskQueryOptions(Number(taskId)),
  });

  console.log("/tasks/$taskId/edit");

  return <TaskForm task={task!} />;
}
