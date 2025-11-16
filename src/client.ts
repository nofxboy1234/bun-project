import { treaty } from "@elysiajs/eden";
import type { App } from "@/index";

const client = treaty<App>("localhost:3000");

const { data: index } = await client.api.v1.tasks.get();
console.log(index);
