import styles from "./styles.module.css";
import { Task } from "./Task";
import plusIcon from "@/icons/add_2.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task as Todo } from "./types";

export function Tasks() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((r) => r.json()),
  });

  const mutation = useMutation({
    mutationFn: (newTask: Todo) =>
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Oops!</span>;

  return (
    <div className={styles.app}>
      <div className={`${styles.header} ${styles.stickyHeader}`}>
        <h1 className={styles.title}>asa-yoru</h1>
        <img
          src={plusIcon}
          alt="Create Task"
          className={styles.plusIcon}
          onClick={() =>
            mutation.mutate({
              title: "Dylan",
              description: "Palmboom",
              deadline: new Date(),
            })
          }
        />
      </div>

      <div className={`${styles.nav} ${styles.stickyNav}`}>nav</div>

      <div className={styles.main}>
        <div className={styles.tasksContainer}>
          {data.map((task: Todo) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
