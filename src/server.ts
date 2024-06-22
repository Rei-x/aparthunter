/* eslint-disable @typescript-eslint/no-misused-promises */
// server.ts
import express, { type Request, type Response } from "express";
import next from "next";
import postgraphile, { type PostGraphileOptions } from "postgraphile";
import { env } from "./env";
import { worker } from "./worker";

const app = next({ dev: true });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = express();

  server.use(
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    postgraphile.default(env.DATABASE_URL, "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson: true,
    } satisfies PostGraphileOptions),
  );

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT ?? 3000;
  server.listen(port, (err?: unknown) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);

    worker().catch((e) => {
      console.error("Error starting worker", e);
    });
  });
});
