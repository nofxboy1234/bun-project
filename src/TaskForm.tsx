import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/new")({
  component: TaskForm,
});

export function TaskForm() {
  return <div>TaskForm</div>;
}
