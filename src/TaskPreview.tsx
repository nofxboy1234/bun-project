import styles from "./styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

export function TaskPreview({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/v1/tasks/${id}`, { method: "DELETE" }),
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
      <div>{task.deadline.toString()}</div>
      <div className={styles.taskOperations}>
        <img
          src={updateIcon}
          alt="Update Task"
          className={styles.updateIcon}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            navigate({ to: "/tasks/$taskId/edit", params: { taskId } });
          }}
        />
        <img
          src={deleteIcon}
          alt="Delete Task"
          className={styles.deleteIcon}
          onClick={(event) => {
            console.log("delete img onclick");
            event.stopPropagation();
            event.preventDefault();
            deleteMutation.mutate(task.id!);
          }}
        />
      </div>
    </Link>
  );
}
