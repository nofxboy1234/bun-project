import "./index.css";
import styles from "./styles.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <div>
        <h1>bun-project</h1>
        <h2>Simplify your tasks</h2>

        <div className={styles.taskContainer}>
          <h3 className={styles.wantToDo}>Want to do</h3>
          <div className={styles.task}>Eat</div>
        </div>

        <div className={styles.taskContainer}>
          <h3 className={styles.needToDo}>Need to do</h3>
          <div className={styles.task}>Sleep</div>
        </div>

        <div className={styles.taskContainer}>
          <h3 className={styles.amDoing}>Am doing</h3>
          <div className={styles.task}>Working</div>
        </div>
      </div>
    </div>
  );
}

export default App;
