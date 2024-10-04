import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: 'app/**/*.graphql',
  config: {
    documentMode: 'documentNode',
  },
  generates: {
    'app/services/graphql.generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
    },
  },
}

export default config
