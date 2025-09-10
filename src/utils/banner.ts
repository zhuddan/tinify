import boxen from 'boxen'
import chalk from 'chalk'
import { name, version } from '../../package.json'
import { getVersionUpdateInfo } from './version'

export function displayBanner() {
  const bannerMessage = `${chalk.cyan(` @${name}@${version}`)}\n`
    + `${chalk.cyanBright('tinify --help')} ${chalk.gray('查看使用帮助')}`
    + `${getVersionUpdateInfo()}`

  const box = boxen(bannerMessage, {
    title: '🚀',
    padding: { top: 1, bottom: 1, left: 10, right: 10 },
    margin: 1,
    borderColor: 'cyan',
    borderStyle: 'round',
    align: 'center',
  })
  console.log(box)
}
