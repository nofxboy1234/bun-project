import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Task } from "../types";
import { api } from "../routes/api.v1.$";

const parseFormData = (data: FormData) => {
  const id = data.get("id");

  const task = {
    title: data.get("title") as string,
    description: data.get("description") as string,
    deadline: new Date(data.get("deadline") as string),
  };

  if (id) {
    return {
      id: Number(id),
      ...task,
    };
  }

  return task;
};

const saveTask = createServerFn({ method: "POST" })
  .inputValidator(parseFormData)
  .handler(async ({ data }) => {
    if ("id" in data) {
      const { id, ...payload } = data;
      const { data: result, error } = await api()
        .v1.tasks({ id })
        .patch(payload);

      if (error) throw error;
      return result.task;
    } else {
      const { data: result, error } = await api().v1.tasks.post(data);

      if (error) throw error;
      return result.task;
    }
  });

export function TaskForm({ task }: { task?: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      await saveTask({ data });
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

          saveMutation.mutate(formData);
        }}
      >
        {task && <input type="hidden" name="id" value={task.id} />}
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
