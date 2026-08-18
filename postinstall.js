#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

if (process.env.CI) {
  console.log('CI 环境，跳过 setup.js')
  process.exit(0)
}

const setupFile = path.join(__dirname, 'dist', 'setup.js')

// Installing dependencies in a source checkout runs postinstall before the
// project has been built. Published packages are built by the prepack script.
if (!fs.existsSync(setupFile)) {
  console.log('尚未生成 dist/setup.js，跳过初始化；构建后可运行 npm run setup')
  process.exit(0)
}

require(setupFile)
