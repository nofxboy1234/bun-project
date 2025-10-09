import { sql } from "bun";

const result = await sql.file("./src/queries/tmp.sql");
console.log(result);
