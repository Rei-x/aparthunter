import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import "@/worker";
import { saleQueue } from "@/server/workers/sale";
import { queues } from "@/worker";
import { db } from "@/server/db";
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
  cities: publicProcedure.query(async () => {
    return await db.city.findMany({
      include: {
        _count: {
          select: {
            SaleApartment: true,
          },
        },
      },
      orderBy: {
        SaleApartment: {
          _count: "desc",
        },
      },
    });
  }),
});
