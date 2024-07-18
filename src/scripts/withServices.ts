import { $ } from "execa";
import chalk from "chalk";
import * as fs from "fs/promises";
import { services } from "./services.generated";
import path from "node:path";
import { repoRoot } from "./repoRoot";

const $$ = $({ stdio: "inherit", cwd: repoRoot });

export const withServices = async (
  func: () => Promise<void> | void,
  {
    dockerServices = [],
    handleDown = true,
  }: { dockerServices?: (typeof services)[number][]; handleDown?: boolean } = {
    dockerServices: [],
    handleDown: true,
  },
) => {
  const containers = await $`docker ps --format {{.Names}}`;

  const isAlreadyRunning =
    Array.isArray(dockerServices) && dockerServices.length > 0
      ? dockerServices.every((service) => containers.stdout.includes(service))
      : services.every((service) => containers.stdout.includes(service));

  try {
    await fs.access(path.join(repoRoot, ".env"));
  } catch (error) {
    console.log(chalk.cyan("Didn't find .env file, loading env files..."));
    await $$`pnpm load:env`;
  }

  if (!isAlreadyRunning) {
    console.log(chalk.cyan("Starting services"));
  } else {
    console.log(chalk.cyan("Services are already running"));
  }

  if (Array.isArray(dockerServices) && dockerServices.length > 0) {
    await $$`docker compose up ${dockerServices.join(" ")} -d --wait --build`;
  } else {
    await $$`docker compose up -d --wait --build`;
  }

  try {
    await func();
  } catch (error) {
    console.log(error);
  } finally {
    if (!isAlreadyRunning && handleDown) {
      console.log(chalk.cyan("Stopping services"));
      await $$`pnpm services:down`;
    }
  }
};
