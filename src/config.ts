import os from 'node:os'
import path from 'node:path'

const homeDir = os.homedir()
/**
 * 配置文件名
 */
export const CONFIG_FILE_KEY = path.join(homeDir, '.zd.tinify.key')
/**
 * 配置文件版本号
 */
export const CONFIG_FILE_VERSION = path.join(homeDir, '.zd.tinify.version')
/**
 * API 每月免费额度
 */
export const API_FREE_CREDITS = 500
/**
 * 默认文件匹配模式
 */
export const DEFAULT_PATTERN = '**/*.(png|jpeg|jpg|gif|webp)'
