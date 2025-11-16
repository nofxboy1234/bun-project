import { treaty } from "@elysiajs/eden";
import type { App } from "./index2";

const client = treaty<App>("localhost:3000");

const { data: index } = await client.v1.get();
console.log(index);
