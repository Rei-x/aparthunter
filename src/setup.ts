import { runDb, migrateDbUsingPrisma } from "./scripts/db";
import { runRedis } from "./scripts/redis";

await runDb();
await migrateDbUsingPrisma();
await runRedis();
