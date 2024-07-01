import { $ } from "execa";

export const checkDockerInstalled = async () => {
  try {
    await $`docker --version`;
  } catch {
    console.error(
      "Docker is not installed. Please install Docker and try again.",
    );
    console.error(
      "Docker install guide: https://docs.docker.com/engine/install/",
    );
    process.exit(1);
  }
};

export const checkContainerRunning = async (container: string) => {
  const { stdout } = await $`docker ps -q -f name=${container}`;

  return stdout.trim().length > 0;
};

export const checkContainerExists = async (container: string) => {
  const { stdout } = await $`docker ps -q -a -f name=${container}`;

  return stdout.trim().length > 0;
};

export const startContainer = async (container: string) => {
  await $`docker start ${container}`;
  console.log(`Existing container '${container}' started`);
};
