import { sql } from "bun";

// const result = await sql.file("./src/queries/tmp.sql");
// console.log(result);

interface Cat {
  id: number;
  name: string;
}

const cat: Cat = {
  id: 1,
  name: "Muezza",
};

console.log(cat);
