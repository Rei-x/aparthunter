import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import "@/worker";
import { saleQueue } from "@/server/workers/sale";
export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  addJob: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      await saleQueue.add("saleApartment", {});
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
