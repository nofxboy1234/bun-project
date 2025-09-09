import "./index.css";
import styles from "./styles.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <div>
        <h1 className={styles.getStarted}>Get Started with Bun</h1>

        <div className={styles.grid}>
          <div className={styles.task}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>Do stuff</div>
              <div className={styles.taskNotes}>
                <div>Eat</div>
                <div>Sleep</div>
                <div>Work</div>
              </div>
            </div>
          </div>

          <div className={styles.task}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>Do stuff</div>
              <div className={styles.taskNotes}>
                <div>Eat</div>
                <div>Sleep</div>
                <div>Work</div>
              </div>
            </div>
          </div>

          <div className={styles.task}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>Do stuff</div>
              <div className={styles.taskNotes}>
                <div>Eat</div>
                <div>Sleep</div>
                <div>Work</div>
              </div>
            </div>
          </div>

          <div className={styles.task}>
            <div className={styles.taskContent}>
              <div className={styles.taskTitle}>Do stuff</div>
              <div className={styles.taskNotes}>
                <div>Eat</div>
                <div>Sleep</div>
                <div>Work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
