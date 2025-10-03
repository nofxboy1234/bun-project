// import {
//   DummyDriver,
//   PostgresAdapter,
//   PostgresIntrospector,
//   PostgresQueryCompiler,
// } from "kysely";
import { defineConfig } from "kysely-ctl";
import { db } from "@/database";
// import { db } from "./src/database";

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  kysely: db,
  // dialect: {
  // 	createAdapter() {
  // 		return new PostgresAdapter()
  // 	},
  // 	createDriver() {
  // 		return new DummyDriver()
  // 	},
  // 	createIntrospector(db) {
  // 		return new PostgresIntrospector(db)
  // 	},
  // 	createQueryCompiler() {
  // 		return new PostgresQueryCompiler()
  // 	},
  // },
  //   migrations: {
  //     migrationFolder: "migrations",
  //   },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
