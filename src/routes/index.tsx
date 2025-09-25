import { tasksQueryOptions } from "@/tasksQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import styles from "@/styles.module.css";
import { Task } from "@/Task";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(tasksQueryOptions),
  component: TasksLayoutComponent,
});

function TasksLayoutComponent() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);

  return (
    <div className={styles.main}>
      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
