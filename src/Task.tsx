import styles from "./styles.module.css";

export function Task({
  selected,
  selectTask,
  task,
}: {
  selected: boolean;
  selectTask: (index: number) => void;
  task: { id: number; title: string; deadline: Date };
}) {
  return (
    <div
      className={`${styles.task} ${selected ? styles.selected : ""}`}
      onClick={() => selectTask(task.id)}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}></div>
      </div>
      <div className={styles.angleRect}></div>
    </div>
  );
}
