# @zd~/tinify [![npm](https://img.shields.io/npm/v/@zd~/tinify.svg)](https://www.npmjs.com/package/@zd~/tinify)

轻量级图片压缩命令行工具，基于 [tinypng.com](https://tinypng.com/developers) API。

---

## 安装方法

```bash
npm i @zd~/tinify -g
# 或者
npx @zd~/tinify --help
```

安装后可直接使用 `tinify` 命令。

---

## 使用方法

| 命令示例                                                         | 说明                                   |
|------------------------------------------------------------------|----------------------------------------|
| `tinify --help`                                                  | 显示帮助信息                           |
| `tinify init <key>`                                              | 初始化并设置 API key                   |
| `tinify <glob-pattern>`                                          | 压缩匹配到的图片文件                   |
| `tinify -n <glob-pattern>`                                       | 压缩文件但不覆盖                       |
| `tinify --key <key> <glob-pattern>`                              | 使用指定的 key 进行压缩(会覆盖全局 key)|
| `tinify --no-over <glob-pattern>`                                | 不覆盖模式                             |
| `tinify --limit 10 <glob-pattern>`                               | 并发限制，默认10(建议设置以提高速度)   |

---

## 参数说明

| 参数                        | 说明                                         |
|-----------------------------|----------------------------------------------|
| `-h, --help`                | 显示帮助信息                                 |
| `-k, --key <key>`           | 设置 API key                                 |
| `-n, --no-over`             | 不覆盖模式，默认覆盖                         |
| `-o, --output <dir>`        | 输出目录，默认 tinify-output (不覆盖模式下)   |
| `-l, --limit <num>`         | 并发限制，默认10 (建议设置以提高压缩速度)     |

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

## License

MIT
