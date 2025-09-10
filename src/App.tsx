import { useState } from "react";
import "./index.css";
import styles from "./styles.module.css";
import { Task } from "./Task";

export function App() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const tasks = [{ id: 0 }, { id: 1 }];

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

        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            selectTask={selectTask}
            selected={selectedTask === task.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
