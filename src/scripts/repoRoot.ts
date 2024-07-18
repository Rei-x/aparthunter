import { $ } from "execa";

export const repoRoot = (await $`git rev-parse --show-toplevel`).stdout.trim();
