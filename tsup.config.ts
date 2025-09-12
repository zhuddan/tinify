import { defineConfig } from 'tsup'

export default ({ watch }) => (
  defineConfig({
    entry: {
      script: 'src/cli/index.ts',
      setup: 'src/cli/setup.ts',
    },
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    minify: watch ? false : 'terser',
    clean: true,
    watch,
  })
)
