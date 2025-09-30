import { TaskForm } from "@/TaskForm";
import { taskQueryOptions } from "@/taskQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskId/edit")({
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

  console.log("/tasks/$taskId/edit");

  return <TaskForm task={task} />;
}
