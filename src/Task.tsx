import styles from "./styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function Task({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/tasks/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className={styles.task} onClick={() => console.log(task.id)}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.deadline.toString()}</div>
      <div className={styles.taskOperations}>
        <img src={updateIcon} alt="Delete Task" className={styles.updateIcon} />
        <img
          src={deleteIcon}
          alt="Delete Task"
          className={styles.deleteIcon}
          onClick={() => mutation.mutate(task.id!)}
        />
      </div>
    </div>
  );
}
