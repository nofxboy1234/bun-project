import { TaskForm } from "@/components/TaskForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/locations/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskForm />;
}
