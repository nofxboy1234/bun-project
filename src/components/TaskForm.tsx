import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Task } from "../types";
import { api } from "../routes/api.v1.$";

const parseFormData = (data: FormData): Task => ({
  id: data.get("id") ? Number(data.get("id")) : undefined,
  title: data.get("title") as string,
  description: data.get("description") as string,
  deadline: new Date(data.get("deadline") as string),
});

const postTask = createServerFn({ method: "POST" })
  .inputValidator(parseFormData)
  .handler(async ({ data }) => {
    const title = data.title;
    const description = data.description;
    const deadline = data.deadline;

    const res = await api().v1.tasks.post({ title, description, deadline });
    if (res.error) throw res.error;
  });

const patchTask = createServerFn({ method: "POST" })
  .inputValidator(parseFormData)
  .handler(async ({ data }) => {
    const id = data.id;
    if (!id) throw new Error("Task needs an ID");

    const title = data.title;
    const description = data.description;
    const deadline = data.deadline;

    const res = await api().v1.tasks({ id }).patch({
      title,
      description,
      deadline,
    });
    if (res.error) throw res.error;
  });

export function TaskForm({ task }: { task?: Task }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: async (data: FormData) => {
      await postTask({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate({ to: "/" });
    },
  });

  const patchMutation = useMutation({
    mutationFn: async (data: FormData) => {
      await patchTask({ data });
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
