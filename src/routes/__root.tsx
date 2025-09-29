import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import styles from "@/styles.module.css";
import plusIcon from "@/icons/add_2.svg";

import type { Task } from "@/types";

import "@/index.css";

const RootLayout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: Task) =>
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      <div className={styles.app}>
        <div className={`${styles.header} ${styles.stickyHeader}`}>
          <Link to="/">
            <h1 className={styles.title}>asa-yoru</h1>
          </Link>
          <img
            src={plusIcon}
            alt="Create Task"
            className={styles.plusIcon}
            onClick={() =>
              mutation.mutate({
                title: "Dylan",
                description: "Palmboom",
                deadline: new Date(),
              })
            }
          />
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
