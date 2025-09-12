#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'
import tinify from 'tinify'
import { API_FREE_CREDITS, CONFIG_KEY, DEFAULT_PATTERN } from '../config'
import { AsyncTaskManager } from '../core/AsyncTaskManager'
import { Logger } from '../core/Logger'
import { positionals, values } from '../utils/args'
import { displayBanner } from '../utils/banner'
import { clearCache, shouldCompress, writeCache } from '../utils/cache'
import { displayHelp } from '../utils/help'
import { fetchLatestVersion } from '../utils/version'

/**
 *
 * @returns 配置的 API Key
 */
function getKey() {
  if (fs.existsSync(CONFIG_KEY)) {
    return fs.readFileSync(CONFIG_KEY, 'utf-8').trim()
  }
  else {
    return null
  }
}

/**
 * 显示如何配置 Key 的帮助信息
 */
function displayKeyHelp() {
  Logger.warn('可以通过以下命令配置:\n')
  Logger.info('  tinify init <your_key>  \n')
  Logger.info('  或者(这会覆盖全局的key)  \n')
  Logger.info('  tinify --key <your_key>  \n')
  Logger.warn('如果没有 Key，可以前往 https://tinypng.com/developers 申请')
}

async function main() {
  fetchLatestVersion()
  if (values.help) {
    displayHelp()
    return
  }
  if (values['clear-cache']) {
    clearCache()
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
    fs.writeFileSync(CONFIG_KEY, apiKey)
    Logger.success(`API Key [${apiKey}] 保存成功!`)
    return
  }

  const key = values.key || getKey()

  if (values['show-key']) {
    if (key) {
      Logger.info(`当前配置的 API Key: ${key}`)
    }
    else {
      Logger.warn('当前未配置任何 API Key')
      displayKeyHelp()
    }
    process.exit(1)
  }

  if (!key) {
    Logger.error('请先配置 Tinify API Key，可以通过以下命令配置:\n')
    displayKeyHelp()
    process.exit(1)
  }

  if (!getKey()) {
    // 如果全局没有 key，则保存当前 key 以便下次使用
    fs.writeFileSync(CONFIG_KEY, key)
  }
  tinify.key = key
  const [pattern = DEFAULT_PATTERN] = [command, ...rest].filter(Boolean)
  const overwrite = !values['no-over']
  const inputDir = process.cwd()
  const outputDir = overwrite
    ? inputDir
    : path.resolve(inputDir, values.output)

  fs.mkdirSync(outputDir, { recursive: true })

  const files = await fg(pattern, { cwd: inputDir, dot: true })
  if (!files.length) {
    Logger.warn(`找不到任何需要压缩的图片 at`)
    Logger.warn(`${inputDir}`)
    return
  }
  Logger.info(`找到需要压缩的图片数量: ${files.length}`)
  let compressProgress = 0
  let skipProgress = 0
  let failProgress = 0
  const _limit = Number.parseInt(values.limit)
  const limit = Number.isNaN(_limit) ? 10 : _limit <= 0 ? 1 : _limit
  const atm = new AsyncTaskManager({ maxConcurrency: limit })
  Logger.info(`开始压缩... (并发限制: ${limit})`)
  const tasks = files.map((relativePath) => {
    return async () => {
      try {
        const srcPath = path.join(inputDir, relativePath)
        const destPath = path.join(outputDir, relativePath)
        const _shouldCompress = shouldCompress(srcPath)
        if (values.force || _shouldCompress) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true })
          await tinify.fromFile(srcPath).toFile(destPath)
          compressProgress++
          writeCache(srcPath, fs.statSync(srcPath).mtimeMs) // 写入缓存
          Logger.success(`压缩成功 (${compressProgress}/${files.length}): ${relativePath}`)
        }
        else {
          await sleep()
          skipProgress++
          Logger.warn(`跳过压缩 (${skipProgress}/${files.length}): ${relativePath}`)
        }
      }
      catch (error) {
        failProgress++
        Logger.error(`压缩失败 (${failProgress}/${files.length}): ${relativePath}`)
        Logger.error(`          ${error}`)
      }
    }
  })
  atm.addTask(...tasks)
  const startTime = performance.now()
  await atm.run()
  Logger.infoBg(`图片压缩完成, 耗时 ${((performance.now() - startTime) / 1000).toFixed(2)} 秒`)

  Logger.success(`压缩成功 ${compressProgress} 张`)

  if (compressProgress > 0) {
    Logger.info(`输出目录: ${outputDir}`)
    Logger.info(`API 使用量: ${tinify.compressionCount ?? 0} / ${API_FREE_CREDITS}，本月剩余 ${API_FREE_CREDITS - (tinify.compressionCount ?? 0)}`)
  }

  if (failProgress > 0) {
    Logger.error(`压缩失败 ${failProgress} 张，请检查错误信息`)
  }

  if (skipProgress > 0) {
    Logger.warn(`跳过 ${skipProgress} 张 (已被压缩过的不回重复压缩)`)
    Logger.infoBg('如果想要强制压缩，可以添加 --force 参数')
  }
  process.exit(0)
}

export function sleep() {
  return new Promise(resolve => setTimeout(resolve, 100))
}

main()
