import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    'key': {
      type: 'string',
      short: 'k',
    },
    'no-over': {
      type: 'boolean',
      short: 'n',
      default: false,
    },
    'output': {
      type: 'string',
      short: 'o',
      default: 'tinify-output',
    },
    'help': {
      type: 'boolean',
      short: 'h',
    },
    'limit': {
      type: 'string',
      default: '10',
      short: 'l',
    },
  },
})

export { positionals, values }
