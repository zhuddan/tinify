import boxen from 'boxen'
import chalk from 'chalk'
import { name, version } from '../../package.json'

export function displayBanner() {
  const bannerMessage = `${chalk.cyan(` @${name}@${version}`)}\n`
    + `${chalk.cyanBright('tinify --help')} ${chalk.gray('查看使用帮助')}`
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
