import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { CACHE_FILE_DIR } from './config'
import { Logger } from './Logger'

// 根据文件路径生成缓存文件路径
function getCachePath(filePath: string) {
  const hash = crypto.createHash('sha1').update(filePath).digest('hex') // 路径转 hash
  return path.join(CACHE_FILE_DIR, hash.slice(0, 2), `.${hash}`)
}

/**
 * 读取缓存的 mtimeMs
 */
function readCache(filePath: string) {
  const cacheFile = getCachePath(filePath)
  if (!fs.existsSync(cacheFile))
    return null
  try {
    const data = fs.readFileSync(cacheFile, 'utf-8')
    return data ? Number.parseFloat(data) : null
  }
  catch {
    return null
  }
}

/**
 * 写入缓存
 * @param filePath
 * @param mtimeMs
 */
export function writeCache(filePath: string, mtimeMs: number) {
  const cacheFile = getCachePath(filePath)
  fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
  fs.writeFileSync(cacheFile, mtimeMs.toString(), 'utf-8')
}

/**
 * 判断是否需要压缩
 * @param filePath
 */
export function shouldCompress(filePath: string) {
  const stat = fs.statSync(filePath)
  const currentMtime = stat.mtimeMs
  const cachedMtime = readCache(filePath)
  return currentMtime !== cachedMtime
}

/**
 * 清理缓存
 */
export function clearCache() {
  if (fs.existsSync(CACHE_FILE_DIR)) {
    fs.rmSync(CACHE_FILE_DIR, { recursive: true, force: true })
  }
  Logger.success('压缩缓存清理成功')
}
