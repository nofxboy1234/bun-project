import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Task } from "./types";
import { api } from "./routes/api.v1.$";

export function TaskForm({ task }: { task?: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const formDataToTask = (taskData: FormData) => ({
    title: taskData.get("title") as string,
    description: taskData.get("description") as string,
    deadline: new Date(taskData.get("deadline") as string),
  });

  const postMutation = useMutation({
    mutationFn: async (taskData: FormData) =>
      await api().v1.tasks.post(formDataToTask(taskData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate({ to: "/" });
    },
  });

  const patchMutation = useMutation({
    mutationFn: async (taskData: FormData) => {
      const taskId = task!.id;

      return await api()
        .v1.tasks({ id: taskId! })
        .patch(formDataToTask(taskData));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate({ to: "/" });
    },
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const form = event.currentTarget;
          const formData = new FormData(form);

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
                ? task.deadline.toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }
          />
        </div>

        <button type="submit">{task ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
