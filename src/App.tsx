import { useState } from "react";
import "./index.css";
import styles from "./styles.module.css";
import { Task } from "./Task";

export function App() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const tasks = [
    {
      id: 0,
      title: "Task 0",
      description: "ksdjfkjsdkf",
      deadline: new Date(),
    },
    {
      id: 1,
      title: "Task 1",
      description: "sdlkfjdskjkj",
      deadline: new Date(),
    },
    { id: 2, title: "Task 2", description: "asdfsfsfd", deadline: new Date() },
    // {
    //   id: 3,
    //   title: "Task 3",
    //   description: "addfdfdgfgkjkj",
    //   deadline: new Date(),
    // },
    // {
    //   id: 4,
    //   title: "Task 4",
    //   description: "sfkljjkjipwiwi",
    //   deadline: new Date(),
    // },
    // {
    //   id: 5,
    //   title: "Task 5",
    //   description: "zzzzzzzzzzjdkfjskdf",
    //   deadline: new Date(),
    // },
    // {
    //   id: 6,
    //   title: "Task 6",
    //   description: "sdklfjdskikjskjdfksdjkfjskfjdk",
    //   deadline: new Date(),
    // },
  ];

  const selectTask = (index: number) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === index ? null : index,
    );
  };

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
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
