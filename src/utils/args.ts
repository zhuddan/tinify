import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    /**
     * API Key
     */
    'key': {
      type: 'string',
      short: 'k',
    },
    /**
     * 显示当前配置的 API Key
     */
    'show-key': {
      type: 'boolean',
      short: 's',
      default: false,
    },
    /**
     * 不覆盖源文件模式，默认覆盖
     */
    'no-over': {
      type: 'boolean',
      short: 'n',
      default: false,
    },
    /**
     * 输出目录，仅在不覆盖模式下生效，默认 tinify-output
     */
    'output': {
      type: 'string',
      short: 'o',
      default: 'tinify-output',
    },
    /**
     * 并发限制，默认10
     */
    'limit': {
      type: 'string',
      default: '10',
      short: 'l',
    },
    /**
     * 强制压缩已压缩过的图片
     */
    'force': {
      type: 'boolean',
      default: false,
      short: 'f',
    },
    /**
     * 清除压缩缓存
     */
    'clear-cache': {
      type: 'boolean',
      default: false,
      short: 'c',
    },
    /**
     * 显示帮助
     */
    'help': {
      type: 'boolean',
      short: 'h',
    },
    /**
     * 显示版本号
     */
    'version': {
      type: 'boolean',
      short: 'v',
    },
  },
})

export { positionals, values }
