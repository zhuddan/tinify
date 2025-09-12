import chalk from 'chalk'

import { name, version } from '../../package.json'
import { getVersionUpdateInfo } from './version'

const { black, cyanBright, greenBright, yellowBright, bold, gray } = chalk

/**
 * 显示帮助信息
 */
export function displayHelp() {
  console.log(`
${bold(cyanBright(`${name}@${version} - 轻量级图片压缩命令行工具`))}
${getVersionUpdateInfo()}

${bold(black('安装方法:'))}
  ${greenBright(`npm i ${name} -g`)}
  ${greenBright(`npx ${name} --help`)}
${gray('安装后可直接使用 ')}${greenBright('tinify')}${gray(' 命令')}

${bold(black('使用方法:'))}
  ${greenBright('tinify --help')}                      ${gray('显示帮助信息')}
  ${greenBright('tinify init')} ${yellowBright('<key>')}                  ${gray('初始化并设置 API key')}
  ${greenBright('tinify')} ${yellowBright('<glob-pattern>')}              ${gray('压缩匹配到的图片文件')}
  ${greenBright('tinify -n')} ${yellowBright('<glob-pattern>')}           ${gray('压缩文件但不覆盖')}
  ${greenBright('tinify --key')} ${yellowBright('<key> <glob-pattern>')}  ${gray('使用指定的 key 进行压缩(会覆盖全局 key)')}
  ${greenBright('tinify --no-over')} ${yellowBright('<glob-pattern>')}    ${gray('不覆盖模式')}
  ${greenBright('tinify --limit 10')} ${yellowBright('<glob-pattern>')}   ${gray('并发限制，默认10(建议设置以提高压缩速度)')}
  ${greenBright('tinify --force')} ${yellowBright('<glob-pattern>')}      ${gray('强制压缩，忽略所有压缩过的图片')}
  ${greenBright('tinify --clear-cache')}               ${gray('删除所有压缩缓存')}

${bold(black('参数:'))}
  ${greenBright('-h, --help')}                         ${gray('显示帮助信息')}
  ${greenBright('-k, --key')} ${yellowBright('<key>')}                    ${gray('设置 API key')}
  ${greenBright('-n, --no-over')}                      ${gray('不覆盖源文件模式，默认覆盖')}
  ${greenBright('-o, --output')} ${yellowBright('<dir>')}                 ${gray('输出目录，默认 tinify-output (仅在不覆盖模式下生效)')}
  ${greenBright('-l, --limit')} ${yellowBright('<num>')}                  ${gray('并发限制，默认10 (建议设置以提高压缩速度)')}
  ${greenBright('-f, --force')}                        ${gray('强制压缩，忽略所有压缩过的图片')}
  ${greenBright('-c, --clear-cache')}                  ${gray('删除所有压缩缓存')}
  `)
}
