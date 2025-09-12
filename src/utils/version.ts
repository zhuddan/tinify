import fs from 'node:fs'
import https from 'node:https'
import chalk from 'chalk'
import { version as currentVersion, name } from '../../package.json'
import { CONFIG_VERSION } from '../config'

/**
 * 配置文件路径
 */
export function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${name}/latest`, (res) => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => {
        try {
          const latest = JSON.parse(data).version
          fs.writeFileSync(CONFIG_VERSION, latest)
        }
        catch {}
      })
    }).on('error', reject)
  })
}

/**
 * 获取版本更新信息
 */
export function getVersionUpdateInfo() {
  if (fs.existsSync(CONFIG_VERSION)) {
    const lastVersion = fs.readFileSync(CONFIG_VERSION, 'utf-8').trim()
    const v = lastVersion.split('.').map(num => Number.parseInt(num, 10))
    if (v.length !== 3 || v.some(num => Number.isNaN(num))) {
      return ''
    }
    const [major, minor, patch] = v
    const [currentMajor, currentMinor, currentPatch] = currentVersion.split('.').map(num => Number.parseInt(num, 10))
    if (major > currentMajor
      || (major === currentMajor && minor > currentMinor)
      || (major === currentMajor && minor === currentMinor && patch > currentPatch)) {
      return `\n${chalk.dim(`发现新版本 ${lastVersion}，使用 npm i ${name}@latest -g 更新`)}`
    }
    else {
      return ''
    }
  }
  return ''
}
