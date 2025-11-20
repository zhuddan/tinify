// Linux / macOS 常用

// systemLang.ts
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'

import path from 'node:path'

import process from 'node:process'
import { LOCALE_KEY } from '../config'
import en from './locales/en.json'

type MessageSchema = typeof en

type MessageKeys<T> = {
  [K in keyof T & string]: T[K] extends object
    ? T[K] extends any[]
      ? K
      : keyof T[K] extends never
        ? K
        : `${K}.${MessageKeys<T[K]>}`
    : K
}[keyof T & string]

/**
 * @returns 配置的语言
 */
function getLocale() {
  if (fs.existsSync(LOCALE_KEY)) {
    return fs.readFileSync(LOCALE_KEY, 'utf-8').trim() as 'en' | 'zh'
  }
  else {
    return null
  }
}
/**
 * @param key 保存语言
 */
function setLocale(key: string) {
  // 创建配置目录
  fs.mkdirSync(path.dirname(LOCALE_KEY), { recursive: true })
  // 保存 key
  fs.writeFileSync(LOCALE_KEY, key)
}

function init() {
  if (!getLocale()) {
    if (!isSystemLanguageChinese()) {
      setLocale('en')
    }
    else {
      setLocale('zh')
    }
  }
}

export function t(key: MessageKeys<MessageSchema>): string {
  const locale = getLocale()
  if (!locale)
    return 'en' as const
  if (locale !== 'en' && locale !== 'zh') {
    return ''
  }
  const messages = { en, zh: en }
  const msg = messages[locale]
  const keys = key.split('.')
  let result: any = msg
  let i = 0
  while (i < keys.length) {
    const k = keys[i]
    result = result[k]
    // 如果是 undefined，返回空字符串
    if (result === undefined)
      return ''
    // 如果不是对象（但不是最后一层），还有下一层属性要获取，返回空字符串
    if (i < keys.length - 1 && (typeof result !== 'object' || result === null))
      return ''
    i++
  }
  return result as string
}

function isSystemLanguageChinese(): boolean {
  const platform = os.platform()

  try {
    let lang = ''

    if (platform === 'darwin') {
      // macOS
      // 读取首选语言列表，第一个就是系统显示语言
      const output = execSync('defaults read -g AppleLanguages', { encoding: 'utf8' })
      const match = output.match(/\("(.+?)"/)
      if (match)
        lang = match[1]
    }
    else if (platform === 'win32') {
      // Windows
      const output = execSync(
        'reg query "HKEY_CURRENT_USER\\Control Panel\\International" /v LocaleName',
        { encoding: 'utf8' },
      )
      const match = output.match(/LocaleName\s+REG_SZ\s+(.+)/)
      if (match)
        lang = match[1]
    }
    else {
      // Linux/其他平台，尝试用环境变量
      lang = process.env.LANG || process.env.LANGUAGE || ''
    }

    // 判断是否包含中文标识
    return /^zh-|$/i.test(lang)
  }
  catch {
    // 出错默认返回 false
    return false
  }
}

init()
