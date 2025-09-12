import "./index.css";
import styles from "./styles.module.css";
import { Task } from "./Task";
import plusIcon from "@/icons/add_2.svg";

export function App() {
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
    {
      id: 3,
      title: "Task 3",
      description: "addfdfdgfgkjkj",
      deadline: new Date(),
    },
    {
      id: 4,
      title: "Task 4",
      description: "sfkljjkjipwiwi",
      deadline: new Date(),
    },
    {
      id: 5,
      title: "Task 5",
      description: "zzzzzzzzzzjdkfjskdf",
      deadline: new Date(),
    },
    {
      id: 6,
      title: "Task 6",
      description: "sdklfjdskikjskjdfksdjkfjskfjdk",
      deadline: new Date(),
    },
    {
      id: 7,
      title: "Task 7",
      description: "the last task!",
      deadline: new Date(),
    },
    {
      id: 8,
      title: "Task 8",
      description: "the last task!",
      deadline: new Date(),
    },
    {
      id: 9,
      title: "Task 9",
      description: "the last task!",
      deadline: new Date(),
    },
    {
      id: 10,
      title: "Task 10",
      description: "the last task!",
      deadline: new Date(),
    },
    {
      id: 11,
      title: "Task 11",
      description: "the last task!",
      deadline: new Date(),
    },
  ];

  return (
    <div className={styles.app}>
      <div className={`${styles.header} ${styles.stickyHeader}`}>
        <h1 className={styles.title}>asa-yoru</h1>
        <img src={plusIcon} alt="Create Task" className={styles.plusIcon} />
      </div>

      <div className={`${styles.nav} ${styles.stickyNav}`}>nav</div>

      <div className={styles.main}>
        <div className={styles.tasksContainer}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
