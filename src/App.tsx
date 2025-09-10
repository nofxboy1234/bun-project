import { useState } from "react";
import "./index.css";
import styles from "./styles.module.css";
import taskImage from "./img/unnamed.png";

export function App() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const selectTask = (index: number) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === index ? null : index,
    );
  };

  return (
    <div className={styles.app}>
      <div>
        <h1 className={styles.getStarted}>yacine</h1>
        <h2 className={styles.hello}>Systems Engineer</h2>

        <div
          className={`${styles.task} ${
            selectedTask === 0 ? styles.selected : ""
          }`}
          onClick={() => selectTask(0)}
        >
          <img
            src={taskImage}
            alt="A task to do"
            className={`${styles.taskImage}`}
          />
        </div>

        <div
          className={`${styles.task} ${
            selectedTask === 1 ? styles.selected : ""
          }`}
          onClick={() => selectTask(1)}
        >
          <img
            src={taskImage}
            alt="A task to do"
            className={`${styles.taskImage}`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
