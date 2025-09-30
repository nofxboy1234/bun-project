import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/new")({
  component: TaskForm,
});

export function TaskForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (taskData: FormData) =>
      fetch("/api/tasks", {
        method: "POST",
        body: taskData,
      }),
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

          mutation.mutate(formData);
        }}
      >
        <div>
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            name="title"
            defaultValue="New Task"
            placeholder="New Task"
          />
        </div>

        <div>
          <label htmlFor="task-description">Description</label>
          <input
            type="text"
            id="task-description"
            name="description"
            defaultValue="Get this done"
            placeholder="Get this done"
          />
        </div>

        <div>
          <label htmlFor="task-deadline">Deadline</label>
          <input type="date" id="task-deadline" name="deadline" />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
