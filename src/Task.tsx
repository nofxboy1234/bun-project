import styles from "./styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";

export function Task({
  task,
}: {
  task: { id: number; title: string; description: string; deadline: Date };
}) {
  return (
    <div className={styles.task}>
      <div>{task.title}</div>
      <div className={styles.blocks}>
        <img src={updateIcon} alt="Delete Task" className={styles.updateIcon} />
        <img src={deleteIcon} alt="Delete Task" className={styles.deleteIcon} />
      </div>
    </div>
  );
}
