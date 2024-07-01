import { execa } from "execa";
import * as fs from "fs";
import * as path from "path";

import { createInterface } from "readline/promises";
import { randomBytes } from "crypto";
import {
  checkDockerInstalled,
  checkContainerRunning,
  checkContainerExists,
} from "./docker";
import { env } from "@/env";

const DB_CONTAINER_NAME = "apart-hunter-postgres";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const envPath = path.resolve(__dirname, "..", ".env");

const DATABASE_URL = env.DATABASE_URL;

const getPasswordAndPort = (url: string) => {
  const passwordMatch = url.match(/:\/\/.*:(.*)@/);
  const portMatch = url.match(/:(\d+)\/?/);

  if (!passwordMatch || !portMatch) {
    console.error("Invalid DATABASE_URL format");
    process.exit(1);
  }

  return {
    password: passwordMatch[1],
    port: portMatch[1],
  };
};

const { password: DB_PASSWORD, port: DB_PORT = "5432" } =
  getPasswordAndPort(DATABASE_URL);

const runCommand = async (command: string, args: string[]) => {
  try {
    await execa(command, args, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command} ${args.join(" ")}`);
    console.error(error);
    process.exit(1);
  }
};

const startContainer = async (container: string) => {
  await runCommand("docker", ["start", container]);
  console.log(`Existing container '${container}' started`);
};

const runDatabaseContainer = async (password: string, port: string) => {
  await runCommand("docker", [
    "run",
    "-d",
    "--name",
    DB_CONTAINER_NAME,
    "-e",
    "POSTGRES_USER=postgres",
    "-e",
    `POSTGRES_PASSWORD=${password}`,
    "-e",
    "POSTGRES_DB=apart-hunter",
    "-p",
    `${port}:5432`,
    "docker.io/postgres",
  ]);
  console.log(
    `Database container '${DB_CONTAINER_NAME}' was successfully created`,
  );
};

const promptForPassword = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(
    "Should we generate a random password for you? [y/N]: ",
  );
  rl.close();

  if (answer.toLowerCase() === "y") {
    return generateRandomPassword();
  } else {
    throw new Error("Please set a password in the .env file and try again");
  }
};

const generateRandomPassword = () => {
  return randomBytes(9)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const updateEnvFile = (password: string) => {
  const envFileContent = fs.readFileSync(envPath, "utf8");
  const updatedContent = envFileContent.replace(/:password@/, `:${password}@`);
  fs.writeFileSync(envPath, updatedContent, "utf8");
};

export const runDb = async () => {
  await checkDockerInstalled();

  if (await checkContainerRunning(DB_CONTAINER_NAME)) {
    console.log(`Database container '${DB_CONTAINER_NAME}' already running`);
    return;
  }

  if (await checkContainerExists(DB_CONTAINER_NAME)) {
    await startContainer(DB_CONTAINER_NAME);
    return;
  }

  let dbPassword = DB_PASSWORD;

  if (dbPassword === "password" || !dbPassword) {
    console.log("You are using the default database password");
    try {
      dbPassword = await promptForPassword();
      updateEnvFile(dbPassword);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  }

  await runDatabaseContainer(dbPassword, DB_PORT);
};

export const migrateDbUsingPrisma = async () => {
  await runCommand("pnpm", ["db:push"]);
};
