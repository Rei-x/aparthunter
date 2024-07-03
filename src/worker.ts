import {
  saleQueue,
  saleQueueSingle,
  saleWorker,
  saleWorkerSingle,
} from "./server/workers/sale";

export const workers = () => [saleWorker, saleWorkerSingle] as const;
export const queues = () => [saleQueue, saleQueueSingle] as const;
