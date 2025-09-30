import type { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import styles from "../styles.module.css";
import plusIcon from "@/icons/add_2.svg";

import "../index.css";

const RootLayout = () => {
  return (
    <>
      <div className={styles.app}>
        <div className={`${styles.header} ${styles.stickyHeader}`}>
          <Link to="/">
            <h1 className={styles.title}>asa-yoru</h1>
          </Link>
          <Link to="/tasks/new">
            <img src={plusIcon} alt="Create Task" className={styles.plusIcon} />
          </Link>
        </div>

        <div className={`${styles.nav} ${styles.stickyNav}`}>nav</div>

        <Outlet />
      </div>

      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    notFoundComponent: () => {
      return (
        <div>
          <p>This is the notFoundComponent configured on root route</p>
          <Link to="/">Start Over</Link>
        </div>
      );
    },
  },
);
