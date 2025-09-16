import styles from "./styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import type { Task } from "./types";

export function Task({ task }: { task: Task }) {
  return (
    <div className={styles.task} onClick={() => console.log(task.id)}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.deadline.toString()}</div>
      <div className={styles.taskOperations}>
        <img src={updateIcon} alt="Delete Task" className={styles.updateIcon} />
        <img src={deleteIcon} alt="Delete Task" className={styles.deleteIcon} />
      </div>
    </div>
  );
}
