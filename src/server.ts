/* eslint-disable @typescript-eslint/no-misused-promises */
// server.ts
import express, { type Request, type Response } from "express";
import next from "next";
import postgraphile, { type PostGraphileOptions } from "postgraphile";
import { env } from "./env";
import { queues, workers } from "./worker";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

const app = next({ dev: true });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = express();

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/ui");

  createBullBoard({
    queues: queues().map((queue) => new BullMQAdapter(queue)),
    // @ts-expect-error wtf
    serverAdapter,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  server.use("/ui", serverAdapter.getRouter());
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT ?? 3000;
  server.listen(port, (err?: unknown) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);

    workers().forEach((worker) => {
      worker
        .run()
        .then(() => {
          console.log(`${worker.name} worker is running`);
        })
        .catch((error) => {
          console.error(`${worker.name} worker failed to start:`, error);
        });
    });
  });
});
