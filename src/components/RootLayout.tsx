import { Link, Outlet } from "@tanstack/react-router";
import styles from "@/styles.module.css";
import plusIcon from "@/icons/add_2.svg";

export default function RootLayout() {
  return (
    <div className={styles.app}>
      <div className={`${styles.header} ${styles.stickyHeader}`}>
        <Link to="/">
          <h1 className={styles.title}>bun-project</h1>
        </Link>
        <Link to="/tasks/new">
          <img src={plusIcon} alt="Create Task" className={styles.plusIcon} />
        </Link>
      </div>

      <div className={`${styles.nav} ${styles.stickyNav}`}>nav</div>

      <Outlet />
    </div>
  );
}
