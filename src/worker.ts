import { makeWorkerUtils, run } from "graphile-worker";
import { env } from "./env";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace GraphileWorker {
    interface Tasks {
      hello: {
        name: string;
      };
    }
  }
}

export const worker = async () => {
  const runner = await run({
    connectionString: env.DATABASE_URL,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: {
      hello: async (payload, helpers) => {
        const { name } = payload;
        helpers.logger.info(`Hello, ${name}`);
      },
    },
    crontab: `* * * * * hello {"name":"żelek"}`,
  });

  await runner.promise;
};

export const queue = async () =>
  makeWorkerUtils({
    connectionString: env.DATABASE_URL,
  });
