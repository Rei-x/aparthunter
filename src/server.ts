/* eslint-disable @typescript-eslint/no-misused-promises */
// server.ts
import express, { type Request, type Response } from "express";
import next from "next";
import { env } from "./env";
import { queues, workers } from "./worker";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { saleQueue } from "./server/workers/sale";

const app = next({ dev: env.NODE_ENV === "development" });
const handle = app.getRequestHandler();

void app
  .prepare()
  .then(() => {
    const server = express();

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/ui");

    createBullBoard({
      queues: queues().map((queue) => new BullMQAdapter(queue)),
      // @ts-expect-error wtf this is
      serverAdapter,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    server.use("/ui", serverAdapter.getRouter());
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    const port = process.env.PORT ?? 3000;
    server.listen(port, async (err?: unknown) => {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port.toString()}`);

      workers().forEach((worker) => {
        worker
          .run()
          .then(() => {
            console.log(`${worker.name} worker is running`);
          })
          .catch((error: unknown) => {
            console.error(`${worker.name} worker failed to run`, error);
            process.exit(1);
          });
      });

      const repeatableQueues = [saleQueue];

      if (env.NODE_ENV === "production") {
        console.log("Setting up repeatable jobs");

        await Promise.all(
          repeatableQueues.map(async (queue) => {
            const jobs = await queue.getRepeatableJobs();

            for (const job of jobs) {
              await queue.removeRepeatableByKey(job.key);
            }

            await queue.add(
              "saleApartment",
              {},
              {
                repeat: {
                  every: 60 * 1000,
                },
              },
            );
          }),
        );
      }
    });
  })
  .catch((error: unknown) => {
    console.error("An error occurred, exiting", error);
    process.exit(1);
  });
