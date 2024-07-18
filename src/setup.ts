import { $ } from "execa";
import { withServices } from "./scripts/withServices";
import { repoRoot } from "./scripts/repoRoot";

const $$ = $({ stdio: "inherit", cwd: repoRoot });

await withServices(async () => {
  await $$`pnpm db:push`;
});
