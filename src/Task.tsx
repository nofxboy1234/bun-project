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
      onClick={() => selectTask(task.id)}
    >
      <div className={styles.taskContent}>
        <div className={styles.angleRect}>{task.title}</div>
        <div className={styles.taskHeader}>{task.description}</div>
        <div className={styles.taskFooter}>{task.deadline.toString()}</div>
      </div>
    </div>
  );
}
