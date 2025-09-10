import "./index.css";
import styles from "./styles.module.css";
import taskImage from "./img/unnamed.png";

export function App() {
  return (
    <div className={styles.app}>
      <div>
        <h1 className={styles.getStarted}>yacine</h1>
        <h2 className={styles.hello}>Systems Engineer</h2>

        <div className={`${styles.selected}`}>
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
