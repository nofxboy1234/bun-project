import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "@/tasksQueryOptions";

import styles from "@/styles.module.css";

import { TaskPreview } from "@/components/TaskPreview";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      ...tasksQueryOptions,
      revalidateIfStale: true,
    });
  },
  component: TasksLayoutComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on /</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
  pendingComponent: () => {
    return <div>loading index</div>;
  },
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
        {tasks!.map((task) => (
          <TaskPreview key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
