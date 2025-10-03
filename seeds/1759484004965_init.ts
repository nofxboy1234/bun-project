import type { Kysely } from "kysely";

// replace `any` with your database interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function seed(db: Kysely<any>): Promise<void> {
  // seed code goes here...
  // note: this function is mandatory. you must implement this function.
}
