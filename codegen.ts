import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/gql/sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
    },
  },
};

export default config;
