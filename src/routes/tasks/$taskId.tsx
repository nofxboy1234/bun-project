import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Task } from "@/Task";

export const Route = createFileRoute("/tasks/$taskId")({
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["tasks", taskId],
      queryFn: () => fetch(`/api/tasks/${taskId}`).then((r) => r.json()),
      revalidateIfStale: true,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => fetch(`/api/tasks/${taskId}`).then((r) => r.json()),
  });

  return <Task task={task} />;
}
