#!/usr/bin/env node
const process = require('node:process')

if (process.env.CI) {
  console.log('CI 环境，跳过 setup.js')
  process.exit(0)
}

require('./dist/setup.js')
