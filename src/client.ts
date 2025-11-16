import { treaty } from "@elysiajs/eden";
import type { Api } from "@/index";

const client = treaty<Api>("localhost:3000");

const { data: index } = await client.api.v1.tasks.get();
console.log(index);
