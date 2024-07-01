import { saleQueue, saleWorker } from "./server/workers/sale";

export const workers = () => [saleWorker] as const;
export const queues = () => [saleQueue] as const;
