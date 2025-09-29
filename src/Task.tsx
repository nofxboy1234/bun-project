import styles from "./styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function Task({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/tasks/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const taskId = task.id!.toString();

  return (
    <Link
      to="/tasks/$taskId"
      params={{ taskId }}
      className={styles.task}
      onClick={() => console.log("Link onclick")}
    >
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.deadline.toString()}</div>
      <div className={styles.taskOperations}>
        <img src={updateIcon} alt="Delete Task" className={styles.updateIcon} />
        <img
          src={deleteIcon}
          alt="Delete Task"
          className={styles.deleteIcon}
          onClick={(event) => {
            console.log("img onclick");
            event.stopPropagation();
            event.preventDefault();
            mutation.mutate(task.id!);
          }}
        />
      </div>
    </Link>
  );
}
