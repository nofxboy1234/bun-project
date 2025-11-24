import type { Task } from "../types";

export function Task({ task }: { task: Task }) {
  return (
    <div>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.deadline.toString()}</div>
    </div>
  );
}
