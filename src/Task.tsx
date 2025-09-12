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
  return <div className={styles.task}>{task.title}</div>;
}
