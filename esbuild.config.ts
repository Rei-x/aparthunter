import esbuild from "esbuild";

import dotenv, { type DotenvParseOutput } from "dotenv";

const result = dotenv.config({ path: ".env.production" });

function prepareDefine(config: DotenvParseOutput | undefined) {
  const define = {};
  // @ts-expect-error ?? żelo
  for (const [key, value] of Object.entries(config)) {
    // @ts-expect-error ?? żelo
    define[`process.env.${key}`] = JSON.stringify(value);
  }
  return define;
}

const define = prepareDefine(result.parsed);
try {
  esbuild
    .build({
      entryPoints: {
        server: "src/server.ts",
      },
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node18",
      outExtension: { ".js": ".mjs" },
      minify: true,
      sourcemap: true,
      outdir: "dist",
      define,
      packages: "external",
    })
    .catch(() => {
      return process.exit(1);
    });
} catch (error) {
  console.log(error);
}
