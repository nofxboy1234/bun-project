import { useState } from "react";
import "./index.css";
import styles from "./styles.module.css";
import { Task } from "./Task";

export function App() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const tasks = [
    { id: 0, title: "Task 1", deadline: new Date() },
    { id: 1, title: "Task 2", deadline: new Date() },
    { id: 2, title: "Task 3", deadline: new Date() },
    { id: 3, title: "Task 4", deadline: new Date() },
    { id: 4, title: "Task 5", deadline: new Date() },
    { id: 5, title: "Task 6", deadline: new Date() },
  ];

  const selectTask = (index: number) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === index ? null : index,
    );
  };

  return (
    <div className={styles.app}>
      <div>
        <h1 className={styles.getStarted}>Asa-Yoru</h1>
        <h2 className={styles.hello}>Simple, Fast Tasks</h2>

        <div>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              selectTask={selectTask}
              selected={selectedTask === task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
