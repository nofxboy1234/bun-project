import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "./types";

export function TaskForm({ task }: { task?: Task }) {
  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: (taskData: FormData) =>
      fetch("/api/v1/tasks", {
        method: "POST",
        body: taskData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const patchMutation = useMutation({
    mutationFn: (taskData: FormData) => {
      const taskId = task!.id!.toString();
      taskData.set("id", taskId);

      return fetch(`/api/v1/tasks/${taskId}`, {
        method: "PATCH",
        body: taskData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          console.log(`currentTarget: ${event.currentTarget}`);
          console.log(`target: ${event.target}`);

          const form = event.currentTarget;
          const formData = new FormData(form);
          console.log(formData.entries());

          if (task) {
            patchMutation.mutate(formData);
          } else {
            postMutation.mutate(formData);
          }
        }}
      >
        <div>
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            name="title"
            defaultValue={task?.title ?? "New Task"}
            placeholder="New Task"
          />
        </div>

        <div>
          <label htmlFor="task-description">Description</label>
          <input
            type="text"
            id="task-description"
            name="description"
            defaultValue={task?.description ?? "Get this done"}
            placeholder="Get this done"
          />
        </div>

        <div>
          <label htmlFor="task-deadline">Deadline</label>
          <input
            type="date"
            id="task-deadline"
            name="deadline"
            defaultValue={
              task?.deadline
                ? new Date(task.deadline).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }
          />
        </div>

        <button type="submit">{task ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
