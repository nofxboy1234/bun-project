import { sql } from "bun";

const result = await sql.file("src/db/speciesTrigger.sql");
console.log(result);
