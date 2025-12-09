import styles from "@/styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "../routes/api.v1.$";
import { createServerFn } from "@tanstack/react-start";
import type { ValidationError } from "elysia";

const deleteTask = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data: { id } }) => {
    const { data: result, error } = await api().v1.tasks({ id }).delete();

    if (error) throw error.value;

    return result.task;
  });

export function TaskPreview({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        await deleteTask({ data: { id } });
      } catch (error) {
        console.log((error as ValidationError).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const taskId = task.id!.toString();

  return (
    <Link to="/tasks/$taskId" params={{ taskId }} className={styles.task}>
      <div>{task.title}</div>
      <div>
        {task.deadline.toLocaleDateString("en-ZA", {
          timeZone: "Africa/Johannesburg",
        })}
      </div>
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
            event.preventDefault();
            event.stopPropagation();

            deleteMutation.mutate(task.id!);
          }}
        />
        {deleteMutation.isError && (
          <p style={{ color: "red" }}>
            {(deleteMutation.error as ValidationError).message}
          </p>
        )}
      </div>
    </Link>
  );
}
