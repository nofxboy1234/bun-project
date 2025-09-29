import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Task } from "@/Task";
import { taskQueryOptions } from "@/taskQueryOptions";

export const Route = createFileRoute("/tasks/$taskId")({
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    await queryClient.ensureQueryData({
      ...taskQueryOptions(Number(taskId)),
      revalidateIfStale: true,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery({
    ...taskQueryOptions(Number(taskId)),
  });

  return <Task task={task} />;
}
