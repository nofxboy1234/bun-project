import styles from "./styles.module.css";

export function Task({
  task,
}: {
  task: { id: number; title: string; description: string; deadline: Date };
}) {
  return <div className={styles.task}>{task.title}</div>;
}
