import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/new")({
  component: TaskForm,
});

export function TaskForm() {
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("submit");
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
          <label htmlFor="task-date">Deadline</label>
          <input type="date" id="task-date" name="date" />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
