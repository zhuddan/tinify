import boxen from 'boxen'
import chalk from 'chalk'
import { name, version } from '../../package.json'
import { getVersionUpdateInfo } from './version'

export function displayBanner(postinstall = false) {
  const bannerMessage = `${chalk.cyan(` ${name}@${version}\n`)}`
    + `${chalk.cyanBright('tinify --help')} ${chalk.gray('查看使用帮助')}`
    + `${getVersionUpdateInfo()}`
    + `\n${postinstall ? `${chalk.greenBright('✅ 安装成功')}` : ''}`
  const box = boxen(bannerMessage, {
    title: '🚀',
    padding: { top: 1, bottom: 1, left: 15, right: 15 },
    margin: 1,
    borderColor: 'cyan',
    borderStyle: 'round',
    align: 'center',
  })
  console.log(box)
}
