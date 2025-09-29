import { createFileRoute } from "@tanstack/react-router";
import { taskQueryOptions } from "@/taskQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Task } from "@/Task";

export const Route = createFileRoute("/tasks/$taskId")({
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    await queryClient.ensureQueryData(taskQueryOptions(Number(taskId)));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(taskQueryOptions(Number(taskId)));

  return <Task task={task} />;
}
