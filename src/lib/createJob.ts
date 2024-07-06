import { env } from "@/env";
import {
  Queue,
  Worker,
  type Processor,
  type QueueOptions,
  type WorkerOptions,
} from "bullmq";
import Redis from "ioredis";
import { type ZodSchema, type z } from "zod";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const createJob = <
  TSchema extends ZodSchema<unknown>,
  TName extends string,
  TResponse,
  TProcessor extends Processor<z.infer<TSchema>, TResponse, TName>,
>(
  name: TName,
  input: TSchema,
  processor: TProcessor,
  options?: { workerOptions?: WorkerOptions; queueOptions?: QueueOptions },
) => {
  const queue = new Queue<
    z.infer<TSchema>,
    Awaited<ReturnType<TProcessor>>,
    TName
  >(name, {
    connection: redis,
    ...options?.queueOptions,
  });

  return {
    worker: new Worker<
      z.infer<TSchema>,
      Awaited<ReturnType<TProcessor>>,
      TName
    >(
      name,
      // @ts-expect-error wtf asdsadas
      async (job) => {
        input.parse(job.data);
        return processor(job) as Promise<Awaited<ReturnType<TProcessor>>>;
      },
      {
        connection: redis,
        autorun: false,
        removeOnComplete: {
          count: 100,
          age: 60,
        },
        removeOnFail: {
          count: 100,
        },
        ...options?.workerOptions,
      },
    ),
    queue,
  };
};
