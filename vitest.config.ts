import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'
import { loadEnv } from 'vite'

export default defineWorkersConfig(({ mode }) => ({
  test: {
    env: loadEnv(mode, process.cwd(), ''),
    globalSetup: './tests/setup.ts',
    poolOptions: {
      workers: {
        singleWorker: true,
        isolatedStorage: false,
        // Ensure tests run fully locally (no Wrangler remote proxy / login required)
        remoteBindings: false,
        wrangler: {
          configPath: './wrangler.jsonc',
        },
        miniflare: {
          cf: true,
        },
      },
    },
  },
}))
