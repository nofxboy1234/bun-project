import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const setup = new Elysia({ name: "setup" }).decorate({
  argon: "a",
  boron: "b",
  carbon: "c",
});

const app2 = new Elysia()
  .use(setup)
  .prefix("decorator", "setup")
  .get("/", ({ setupCarbon, ...rest }) => setupCarbon);

class Logger {
  log(value: string) {
    console.log(value);
  }
}

const cats = new Elysia({ prefix: "/cat" })
  .get("/eat", "Eat")
  .get("/sleep", "Sleep");

const hiPlugin = new Elysia({ name: "hiPlugin" }).macro({
  hi: (word: string) => ({
    beforeHandle() {
      console.log(word);
    },
  }),
});

const auth = new Elysia({ name: "hiPlugin" }).macro({
  isAuth: {
    resolve: () => ({
      user: "saltyaom" as const,
    }),
  },
});

const friends = new Elysia({ name: "friends" }).macro({
  withFriends: {
    body: t.Object({
      friends: t.Tuple([t.Literal("Duke"), t.Literal("Zoey")]),
    }),
  },
});

const errPlugin = new Elysia({ name: "errPlugin" }).onError(
  ({ error, code }) => {
    if (code === "VALIDATION") {
      return error.detail(error.message);
    } else {
      return new Response(error.toString());
    }
  },
);

const app = new Elysia({
  prefix: "v1",
  name: "main",
  aot: true,
  nativeStaticResponse: true,
  serve: {
    development: process.env.NODE_ENV !== "production" && {
      hmr: true,
      console: true,
    },
  },
})
  .use(openapi())
  .use(hiPlugin)
  .use(cats)
  .use(errPlugin)
  .use(auth)
  .use(friends)
  .decorate("logger", new Logger())
  .resolve(() => ({ dog: "duke" }))
  .state("counter", 0)
  .state(({ ...store }) => ({
    ...store,
    elysiaVersion: 1,
  }))
  .get("/macro", () => "hi", {
    hi: "Elysia",
  })
  .get("/auth", ({ user }) => user, {
    isAuth: true,
    role: "admin",
  })
  .post(
    "/friends",
    ({ body }) => {
      console.log(`friends: ${body.friends}`);
      return body.friends;
    },
    {
      body: t.Object({
        name: t.Literal("Lilith"),
      }),
      withFriends: true,
    },
  )
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  })
  .get(
    "/",
    ({ store, cookie: { name }, logger, dog }) => {
      // name.remove();
      name.value = {
        id: 19,
        name: "Duke",
      };
      console.log(name?.value);
      store.counter++;

      console.log(store.counter);
      logger.log("hi");

      console.log(dog);

      return "root!!!";
    },
    {
      cookie: t.Cookie({
        name: t.Optional(
          t.Object({
            id: t.Numeric(),
            name: t.String(),
          }),
        ),
      }),
    },
  )
  .get("/a", () => "hello!" as const, {
    response: {
      200: t.Literal("hello!"),
    },
  })
  .get("/b", () => "bye" as const, {
    response: {
      200: t.Literal("bye"),
    },
  })
  .get("/c", () => ({ name: "3" }), {
    response: t.Object({ name: t.String() }),
  })
  .get(
    "/d",
    () => ({
      name: "duke",
    }),
    {
      response: {
        200: t.Object({ name: t.String() }),
      },
    },
  )
  .get("/e", ({ set }) => {
    set.headers["content-type"] = "text/html";
    return "<html><div>yay</div></html>";
  })
  .get("/f", (context) => {
    console.log(context.server);
  })
  .get("/user/:id", ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .get("/id/*", ({ params }) => params["*"])
  .group("/user", (app) =>
    app.get("/sign-in", "Sign in").get("/sign-up", "Sign up"),
  )
  .get("/ok", function* () {
    yield 1;
    yield 2;
    yield 3;
  })
  .get("/cat/:id", ({ query }) => `Hello Cat! ${query.name}`, {
    query: t.Object({
      name: t.Optional(t.String()),
    }),
    params: t.Object({
      id: t.Number(),
    }),
  })
  .get("/hey", ({ query: { name } }) => name + 1, {
    query: t.Object({
      name: t.Number(),
    }),
  })
  .get("/food", ({ query }) => query.items, {
    query: t.Object({
      items: t.Array(t.String()),
    }),
  })
  .get("/drink", ({ query }) => query.items, {
    query: t.Object({
      items: t.Array(t.String()),
    }),
  })
  .get(
    "/dog/:id",
    ({ params: { id }, path }) => {
      console.log(`path: ${path}`);
      return typeof id;
    },
    {
      params: t.Object({
        id: t.Number(),
        // id: t.Number({ error: () => "Expected id to be a number" }),
      }),
      afterHandle: ({ responseValue }) => {
        console.log(`responseValue: ${responseValue}`);
      },
    },
  )
  .listen(3000);

app
  .handle(
    new Request("http://localhost:3000/v1/friends", {
      method: "POST",
      body: JSON.stringify({ name: "Lilith", friends: ["Duke", "Zoey"] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
  )
  .then(async (response) => {
    // console.log(response);
    // console.log(await response.json());
    console.log(response);
  });

console.log(`🦊 Elysia is running at ${app.server?.url}`);
