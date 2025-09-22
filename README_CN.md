# @zd~/tinify [![npm](https://img.shields.io/npm/v/@zd~/tinify.svg)](https://www.npmjs.com/package/@zd~/tinify)

<p align="center">
  <img src="https://raw.githubusercontent.com/zhuddan/tinify/refs/heads/master/.github/brand.png" alt="brand" width="100%"/>
</p>

轻量级图片压缩命令行工具，基于 [tinypng.com](https://tinypng.com/developers) API。

<p align="center">
  <a href="./README.md">
    English
  </a>
  <span> | </span>
  <a>
    中文
  </a>
</p>

---

## ✨ 优势

- 📂 **批量处理**：支持批量压缩，使用简单的 `glob` 规则匹配文件。
- ⚡ **高速并发**：支持并发批量压缩，默认并发数为 `10`，可通过参数灵活调整。
- 🔄 **多种模式**：覆盖原图或保留原图，两种模式自由选择。
- 💾 **节省 Key**：支持缓存已压缩的图片，避免重复压缩，提高效率，最大化节省你的 `tinypng key`。
- 🗂️ **自定义输出**：支持指定输出目录，方便统一管理压缩后的图片。

---

## 准备工作

请确保你有个 [https://tinypng.com/developers](https://tinypng.com/developers) 的 API Key，免费用户每月可压缩 `500` 张图片。

---

## 安装方法

```bash
npm i @zd~/tinify -g
```

安装后可直接使用 `tinify` 命令。

---

## 使用方法

| 命令示例                                                         | 说明                                   |
|------------------------------------------------------------------|----------------------------------------|
| `tinify --help`                                                  | 显示帮助信息                           |
| `tinify --version`                                               | 显示版本信息                           |
| `tinify init <key>`                                              | 初始化并设置 API key                   |
| `tinify <glob-pattern>`                                          | 压缩匹配到的图片文件                   |
| `tinify -n <glob-pattern>`                                       | 压缩文件但不覆盖                       |
| `tinify --key <key> <glob-pattern>`                              | 使用指定的 key 进行压缩(会覆盖全局 key)|
| `tinify --no-over <glob-pattern>`                                | 不覆盖模式                             |
| `tinify --limit 10 <glob-pattern>`                               | 并发限制，默认10(建议设置以提高速度)   |
| `tinify --force`                                                 | 强制压缩，忽略所有压缩过的图片，默认false       |
| `tinify --clear-cache`                                           | 清除所有压缩缓存                     |
| `tinify --show-key`                                              | 显示当前配置的 API Key               |

---

## 参数说明

| 参数                        | 说明                                         |
|-----------------------------|----------------------------------------------|
| `-h, --help`                | 显示帮助信息                                   |
| `-v, --version`             | 显示版本信息                                   |
| `-k, --key <key>`           | 设置 API key                                  |
| `-n, --no-over`             | 不覆盖模式，默认覆盖                            |
| `-o, --output <dir>`        | 输出目录，默认 tinify-output (不覆盖模式下)      |
| `-l, --limit <num>`         | 并发限制，默认10 (建议设置以提高压缩速度)         |
| `-f, --force`               | 强制压缩，忽略所有压缩过的图片                   |
| `-c, --clear-cache`         | 清除所有压缩缓存                               |
| `-s, --show-key`            | 显示当前配置的 API Key                        |
---

## 获取 API Key

前往 [https://tinypng.com/developers](https://tinypng.com/developers) 免费申请 API Key。

---

## 示例

```bash
tinify init <your_key>
tinify "images/**/*.png"
tinify --no-over "assets/*.jpg"
tinify --key <your_key> "imgs/*.webp"
```

---

## 注意事项
- 免费用户每月可压缩 `500` 张图片，超过后需要等待下个月重置，或者升级为付费用户。
- <glob-pattern> 参数默认为 `**/*.(png|jpeg|jpg|gif|webp)`，可根据需要自行调整，可参考 [fast-glob](https://github.com/mrmlnc/fast-glob)。
- 默认会覆盖原图， 如果不需要覆盖原图，请使用 `--no-over` 参数，并且可以使用 `--output` 参数指定输出目录(默认tinify-output)。
- 建议设置 `--limit` 参数以提高压缩速度，默认并发数为 `10`。
- 用户配置文件位于 `~/.zd.tinify`，可手动编辑该文件修改 `API Key`。
- 压缩缓存文件位于 `~/.zd.tinify/.cache`，可使用 `--clear-cache` 参数删除所有缓存(缓存采用hash分片，理论上不会占用太多空间)。

---

## License

MIT
