#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'
import tinify from 'tinify'
import { AsyncTaskManager } from './AsyncTaskManager'
import { API_FREE_CREDITS, CONFIG_FILE_KEY, DEFAULT_PATTERN } from './config'
import { Logger } from './Logger'
import { positionals, values } from './utils/args'
import { displayBanner } from './utils/banner'
import { displayHelp } from './utils/help'
import { fetchLatestVersion } from './utils/version'

/**
 *
 * @returns 配置的 API Key
 */
function getKey() {
  if (fs.existsSync(CONFIG_FILE_KEY)) {
    return fs.readFileSync(CONFIG_FILE_KEY, 'utf-8').trim()
  }
  else {
    return null
  }
}

async function main() {
  fetchLatestVersion()
  if (values.help) {
    displayHelp()
    return
  }
  displayBanner()
  // 子命令判断
  const [command, ...rest] = positionals
  if (command === 'init') {
    const apiKey = rest[0]
    if (!apiKey) {
      Logger.error('请提供 key，例如: tinify init <key>')
      process.exit(1)
    }
    // TODO: 保存 key 到配置文件
    fs.writeFileSync(CONFIG_FILE_KEY, apiKey)
    Logger.success(`API Key [${apiKey}] 保存成功!`)
    return
  }

  const key = values.key || getKey()

  if (!key) {
    Logger.error('请先配置 Tinify API Key，可以通过以下命令配置:\n')
    Logger.info('  tinify init <your_key>  \n')
    Logger.info('  或者(这会覆盖全局的key)  \n')
    Logger.info('  tinify --key <your_key>  \n')
    Logger.warn('如果没有 Key，可以前往 https://tinypng.com/developers 申请')
    process.exit(1)
  }

  if (key && !getKey()) {
    // 如果全局没有 key，则保存当前 key 以便下次使用
    fs.writeFileSync(CONFIG_FILE_KEY, key)
  }
  tinify.key = key
  const [pattern = DEFAULT_PATTERN] = [command, ...rest].filter(Boolean)
  const overwrite = !values['no-over']
  const inputDir = process.cwd()
  const outputDir = overwrite
    ? inputDir
    : path.resolve(inputDir, values.output)
  const files = await fg(pattern, { cwd: inputDir })
  if (!files.length) {
    Logger.warn(`找不到任何需要压缩的图片 at`)
    Logger.warn(`${inputDir}`)
    return
  }
  Logger.info(`找到需要压缩的图片数量: ${files.length}`)
  Logger.info(`清空输出文件夹，开始压缩...`)
  let progress = 0

  const _limit = Number.parseInt(values.limit)
  const limit = Number.isNaN(_limit) ? 10 : _limit <= 0 ? 1 : _limit
  const atm = new AsyncTaskManager({ maxConcurrency: limit })
  const tasks = files.map((relativePath) => {
    return async () => {
      const srcPath = path.join(inputDir, relativePath)
      const destPath = path.join(outputDir, relativePath)
      await tinify.fromFile(srcPath).toFile(destPath)
      progress++
      Logger.success(`压缩成功 (${progress}/${files.length}): ${relativePath}`)
    }
  })
  atm.addTask(...tasks)
  const startTime = performance.now()
  await atm.run()
  Logger.success(`所有图片压缩完成, 耗时 ${((performance.now() - startTime) / 1000).toFixed(2)} 秒`)
  Logger.info(`输出目录: ${outputDir}`)
  Logger.info(`API 使用量: ${tinify.compressionCount} / ${API_FREE_CREDITS}，本月剩余 ${API_FREE_CREDITS - (tinify.compressionCount ?? 0)}`)
  process.exit(0)
}

main()
