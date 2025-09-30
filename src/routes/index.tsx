import { tasksQueryOptions } from "@/tasksQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import styles from "@/styles.module.css";
import { TaskPreview } from "@/TaskPreview";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      ...tasksQueryOptions,
      revalidateIfStale: true,
    });
  },
  component: TasksLayoutComponent,
});

function TasksLayoutComponent() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);

  return (
    <div
      className={styles.main}
      onClick={() => console.log("main onclick")}
      onClickCapture={() => console.log("main onClickCapture")}
    >
      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <TaskPreview key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
