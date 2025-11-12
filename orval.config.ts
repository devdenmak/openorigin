import { defineConfig } from 'orval'

export default defineConfig({
  fetch: {
    output: {
      target: './app/src/shared/api/fetch/index.ts',
      schemas: './app/src/shared/api/_models',

      override: {
        mutator: {
          path: './app/src/shared/api/base.ts',
          name: 'apiClient',
        },
        formData: {
          path: './app/src/shared/api/formDataMutator.ts',
          name: 'formDataMutator',
        },
      },
    },
    input: {
      target: 'https://openorigin-api.maxsimov.pro/api/openapi.json',
      validation: true,
    },
    hooks: {
      afterAllFilesWrite: {
        command: 'eslint --fix --no-error-on-unmatched-pattern',
      },
    },
  },

  swr: {
    output: {
      client: 'swr',
      target: './app/src/shared/api/swr/index.ts',
      schemas: './app/src/shared/api/_models',

      override: {
        mutator: {
          path: './app/src/shared/api/base.ts',
          name: 'apiClient',
        },
        formData: {
          path: './app/src/shared/api/formDataMutator.ts',
          name: 'formDataMutator',
        },
        swr: {
          // useInfinite: true,
          swrOptions: {
            // errorRetryCount: 3,
            // dedupingInterval: 10000,
          },
          swrMutationOptions: {
            // revalidate: true,
          },
          swrInfiniteOptions: {
            // initialSize: 10,
          },
        },
      },
    },
    input: {
      target: 'https://openorigin-api.maxsimov.pro/api/openapi.json',
      validation: true,
    },
    hooks: {
      afterAllFilesWrite: {
        command: 'eslint --fix --no-error-on-unmatched-pattern',
      },
    },
  },

  zod: {
    output: {
      client: 'zod',
      target: './app/src/shared/api/zod/index.ts',
    },
    input: {
      target: 'https://openorigin-api.maxsimov.pro/api/openapi.json',
      validation: true,
    },
    hooks: {
      afterAllFilesWrite: {
        command: 'eslint --fix --no-error-on-unmatched-pattern',
      },
    },
  },
})
