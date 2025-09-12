# @zd~/tinify [![npm](https://img.shields.io/npm/v/@zd~/tinify.svg)](https://www.npmjs.com/package/@zd~/tinify)

Lightweight image compression command-line tool based on [tinypng.com](https://tinypng.com/developers) API.

<p align="center">
  <a>
    English
  </a>
  <span> | </span>
  <a href="./README_CN.md">
    中文
  </a>
</p>

---

## ✨ Features

- 📂 **Batch Processing**: Supports batch compression with simple `glob` pattern matching.
- ⚡ **High-Speed Concurrency**: Supports concurrent batch compression with default concurrency of `10`, flexibly adjustable via parameters.
- 🔄 **Multiple Modes**: Choose between overwriting original images or preserving them.
- 💾 **Save Your Key**: Supports caching compressed images to avoid duplicate compression, improving efficiency and maximizing your `tinypng key` usage.
- 🗂️ **Custom Output**: Supports specifying output directory for convenient management of compressed images.
---

## Prerequisites

Make sure you have an API Key from [https://tinypng.com/developers](https://tinypng.com/developers). Free users can compress `500` images per month.

---
## Installation
```bash
npm i @zd~/tinify -g
```

After installation, you can directly use the `tinify` command.

---

## Usage
| Command Example                                                   | Description                                    |
|-------------------------------------------------------------------|------------------------------------------------|
| `tinify --help`                                                   | Display help information                       |
| `tinify init <key>`                                               | Initialize and set API key                     |
| `tinify <glob-pattern>`                                           | Compress matched image files                   |
| `tinify -n <glob-pattern>`                                        | Compress files without overwriting            |
| `tinify --key <key> <glob-pattern>`                               | Use specified key for compression (overrides global key) |
| `tinify --no-over <glob-pattern>`                                 | No-overwrite mode                              |
| `tinify --limit 10 <glob-pattern>`                                | Concurrency limit, default 10 (recommended for speed) |
| `tinify --force`                                                  | Force compression, ignore all previously compressed images, default false |
| `tinify --clear-cache`                                            | Clear all compression cache                    |

---

## Parameters
| Parameter                   | Description                                      |
|-----------------------------|--------------------------------------------------|
| `-h, --help`                | Display help information                         |
| `-k, --key <key>`           | Set API key                                      |
| `-n, --no-over`             | No-overwrite mode, default is overwrite         |
| `-o, --output <dir>`        | Output directory, default tinify-output (in no-overwrite mode) |
| `-l, --limit <num>`         | Concurrency limit, default 10 (recommended for speed) |
| `-f, --force`               | Force compression, ignore all previously compressed images |
| `-c, --clear-cache`         | Clear all compression cache                      |

---

## Getting API Key

Visit [https://tinypng.com/developers](https://tinypng.com/developers) to apply for a free API Key.

---

## Examples

```bash
tinify init <your_key>
tinify "images/**/*.png"
tinify --no-over "assets/*.jpg"
tinify --key <your_key> "imgs/*.webp"
```

---

## Notes
- Free users can compress `500` images per month. After exceeding the limit, you need to wait for the next month's reset or upgrade to a paid plan.
- The `<glob-pattern>` parameter defaults to `**/*.(png|jpeg|jpg|gif|webp)`. You can adjust as needed, refer to [fast-glob](https://github.com/mrmlnc/fast-glob).
- By default, original images will be overwritten. If you don't want to overwrite, use the `--no-over` parameter and optionally use `--output` to specify output directory (default: tinify-output).
- It's recommended to set the `--limit` parameter to improve compression speed. Default concurrency is `10`.
- User configuration file is located at `~/.zd.tinify`. You can manually edit this file to modify the `API Key`.
- Compression cache files are located at `~/.zd.tinify/.cache`. Use `--clear-cache` parameter to delete all cache (cache uses hash sharding, theoretically won't occupy too much space).

---

## License
MIT
