import styles from "./styles.module.css";
import { Task } from "./Task";
import plusIcon from "@/icons/add_2.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function Tasks() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/tasks").then((r) => r.json()),
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Oops!</span>;

  return (
    <div className={styles.app}>
      <div className={`${styles.header} ${styles.stickyHeader}`}>
        <h1 className={styles.title}>asa-yoru</h1>
        <img src={plusIcon} alt="Create Task" className={styles.plusIcon} />
      </div>

      <div className={`${styles.nav} ${styles.stickyNav}`}>nav</div>

      <div className={styles.main}>
        <div className={styles.tasksContainer}>
          {data.map(
            (task: {
              id: number;
              title: string;
              description: string;
              deadline: Date;
            }) => (
              <Task key={task.id} task={task} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
