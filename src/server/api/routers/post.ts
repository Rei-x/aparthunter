import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import "@/worker";
import { saleQueue } from "@/server/workers/sale";
import { queues } from "@/worker";
export const mainrouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return Promise.all(
      queues().map(async (q) => ({
        name: q.name,
        workers: await q.getWorkers(),
        waiting: await q.getWaitingCount(),
        completed: await q.getCompletedCount(),
        failed: await q.getFailedCount(),
      })),
    );
  }),
  addJob: publicProcedure.mutation(async () => {
    await saleQueue.add("saleApartment", {});
  }),
});
