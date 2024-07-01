import { env } from "@/env";
import { $ } from "execa";
import {
  checkDockerInstalled,
  checkContainerRunning,
  checkContainerExists,
  startContainer,
} from "./docker";

const $$ = $({ stdio: "inherit" });

const REDIS_CONTAINER_NAME = "apart-hunter-redis";
const REDIS_URL = env.REDIS_URL;

const REDIS_PORT = REDIS_URL.match(/:(\d+)/)?.[1];

if (!REDIS_PORT) {
  console.error("Invalid REDIS_URL format");
  process.exit(1);
}

const createContainer = async () => {
  await $$`docker run -d --name ${REDIS_CONTAINER_NAME} -p ${REDIS_PORT}:6379 redis`;
};

export const runRedis = async () => {
  await checkDockerInstalled();

  if (await checkContainerRunning(REDIS_CONTAINER_NAME)) {
    console.log(`Redis container '${REDIS_CONTAINER_NAME}' already running`);
    return;
  }

  if (await checkContainerExists(REDIS_CONTAINER_NAME)) {
    await startContainer(REDIS_CONTAINER_NAME);
    return;
  }

  await createContainer();
  console.log(
    `Redis container '${REDIS_CONTAINER_NAME}' was successfully created`,
  );
};
