import styles from "./styles.module.css";
import taskImage from "./img/unnamed.png";

export function Task({
  id,
  selected,
  selectTask,
}: {
  id: number;
  selected: boolean;
  selectTask: (index: number) => void;
}) {
  return (
    <div
      className={`${styles.task} ${selected ? styles.selected : ""}`}
      onClick={() => selectTask(id)}
    >
      <img
        src={taskImage}
        alt="A task to do"
        className={`${styles.taskImage}`}
      />
    </div>
  );
}
