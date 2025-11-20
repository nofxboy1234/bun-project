/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";

import type { ReactNode } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import styles from "../styles.module.css";
import plusIcon from "@/icons/add_2.svg";

import "../index.css";

const RootLayout = () => {
  return (
    <RootDocument>
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
    </RootDocument>
  );
};

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "TanStack Start Starter",
        },
      ],
    }),
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
