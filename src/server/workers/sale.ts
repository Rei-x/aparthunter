import { env } from "@/env";
import { createJob } from "@/lib/createJob";
import { otodomClient } from "@/lib/otodom/query";
import { z } from "zod";

export const { worker: saleWorker, queue: saleQueue } = createJob(
  "saleApartment",
  z.object({}),
  async () => {
    const ads = await otodomClient.SearchAds();

    return {
      ads,
    };
  },
);

if (env.NODE_ENV === "development") {
  const allRepeatableJobs = await saleQueue.getRepeatableJobs();

  await Promise.all(
    allRepeatableJobs.map(async (job) => {
      await saleQueue.removeRepeatableByKey(job.key);
    }),
  );
}
