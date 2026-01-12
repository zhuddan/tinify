import os from 'node:os'
import path from 'node:path'
/**
 * 配置文件目录
 */
export const CONFIG_DIR = path.join(os.homedir(), '.zd.tinify')
/**
 * 配置文件名
 */
export const CONFIG_KEY = path.join(CONFIG_DIR, '.key')
/**
 * 本地化文件名
 */
export const LOCALE_KEY = path.join(CONFIG_DIR, '.locale')
/**
 * 配置文件版本号
 */
export const CONFIG_VERSION = path.join(CONFIG_DIR, '.version')
/**
 * 配置文件版本号
 */
export const CACHE_FILE_DIR = path.join(CONFIG_DIR, '.cache')
/**
 * API 每月免费额度
 */
export const API_FREE_CREDITS = 500
/**
 * 默认文件匹配模式
 */
export const DEFAULT_PATTERN = '**/*.(png|jpeg|jpg|gif|webp)'
