import "./index.css";
import styles from "./styles.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <div>
        <h1>bun-project</h1>
        <h2>Simplify your tasks</h2>
        <a href="">home</a>
        <div>Hello</div>
        <div className={`${styles.cyanSquare} ${styles.roundedCorners}`}></div>
        <div className={`${styles.greySquare} ${styles.roundedCorners}`}></div>
        <div className={`${styles.whiteSquare} ${styles.roundedCorners}`}></div>
        <div className={`${styles.navySquare} ${styles.roundedCorners}`}></div>
        <div className={`${styles.redSquare} ${styles.roundedCorners}`}></div>
        <div
          className={`${styles.yellowSquare} ${styles.roundedCorners}`}
        ></div>
        <div className={`${styles.pinkSquare} ${styles.roundedCorners}`}></div>
      </div>
    </div>
  );
}

export default App;
