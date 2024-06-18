import { Hono } from "hono";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    // Do validation
    await next();
  } else {
    return c.text("You don't have access");
  }
}

app.get("/", async (c) => {
  return c.text(
    "Hi this is a simple hono application hosted on cloudflare-workers"
  );
});

app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.header("userName"));
  console.log(c.req.query("n"));

  return c.text("Hello hono and wrangler and user!");
});

export default app;
