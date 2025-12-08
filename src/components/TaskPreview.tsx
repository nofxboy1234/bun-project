import styles from "@/styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "../routes/api.v1.$";

export function TaskPreview({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await api().v1.tasks({ id }).delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const taskId = task.id!.toString();

  return (
    <Link to="/tasks/$taskId" params={{ taskId }} className={styles.task}>
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
            event.stopPropagation();
            event.preventDefault();
            deleteMutation.mutate(task.id!);
          }}
        />
      </div>
    </Link>
  );
}
