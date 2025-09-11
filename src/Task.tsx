import styles from "./styles.module.css";

export function Task({
  selected,
  selectTask,
  task,
}: {
  selected: boolean;
  selectTask: (index: number) => void;
  task: { id: number; title: string; description: string; deadline: Date };
}) {
  return (
    <div
      className={`${styles.task} ${selected ? styles.selected : ""}`}
      onClick={(event) => {
        const target = event.target;

        selectTask(task.id);
      }}
    >
      <div className={styles.taskContent}>
        <div className={styles.angleRect}>{task.title}</div>
        <div className={styles.taskHeader}>{task.description}</div>
        <div className={styles.taskFooter}>{task.deadline.toString()}</div>
      </div>

      <div className={styles.buttons}>
        <button onClick={(event) => event.stopPropagation()}>Update</button>
        <button onClick={(event) => event.stopPropagation()}>Delete</button>
      </div>
    </div>
  );
}
