Bun.serve({
  routes: {
    "/": new Response(Bun.file("./erd/index.html")),
  },

  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file("./erd" + path);

    if (!(await file.exists())) {
      return new Response("Not Found", {status: 404});
    }

    return new Response(file);
  }
})
