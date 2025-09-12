#!/usr/bin/env node

import fs from 'node:fs'

import process from 'node:process'
import { CONFIG_DIR } from '../config'
import { displayBanner } from '../utils/banner'
import { fetchLatestVersion } from '../utils/version'

function ensureConfigDir(dir: string) {
  try {
    const stat = fs.existsSync(dir) ? fs.lstatSync(dir) : null

    if (stat) {
      if (stat.isFile()) {
        // 如果是文件，先删掉
        fs.unlinkSync(dir)
        fs.mkdirSync(dir, { recursive: true })
      }
      else if (stat.isDirectory()) {
        // 已经是目录，啥也不用做
      }
      else {
        // 其他情况（比如符号链接），保险起见删掉重建
        fs.rmSync(dir, { recursive: true, force: true })
        fs.mkdirSync(dir, { recursive: true })
      }
    }
    else {
      // 不存在，直接创建
      fs.mkdirSync(dir, { recursive: true })
    }
  }
  catch (err) {
    console.error(`Failed to ensure config dir: ${dir}`, err)
    process.exit(1)
  }
}

function setup() {
  ensureConfigDir(CONFIG_DIR)
  displayBanner(true)
  fetchLatestVersion()
}

setup()
