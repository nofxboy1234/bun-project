import { TaskForm } from "@/TaskForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskForm />;
}

// onClick={() =>
//   mutation.mutate({
//     title: "Dylan",
//     description: "Palmboom",
//     deadline: new Date(),
//   })
// }
