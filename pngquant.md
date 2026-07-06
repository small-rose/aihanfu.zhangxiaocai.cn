# PNG 图片压缩教程

## 工具简介

| 工具 | 作用 | 压缩类型 | 效果 |
|------|------|---------|------|
| **pngquant** | 将 PNG 转为 256 色（带抖动） | 有损（视觉无损） | 通常减小 **60-80%** |
| **oxipng** | 优化 PNG 压缩算法参数 | 无损 | 额外减小 **5-15%** |

两者配合使用：先 pngquant 量化，再 oxipng 优化。

---

## 安装

### 方式一：直接下载（推荐，无需安装）

**pngquant**：
```bash
# Windows
curl -sL -o pngquant.zip https://pngquant.org/pngquant-windows.zip
unzip pngquant.zip
# 得到 pngquant.exe
```

**oxipng**：
```bash
# 需要 Rust 环境，或用 npm 安装
npm install -g oxipng-bin
# 或下载预编译二进制 https://github.com/shssoichiro/oxipng/releases
```

### 方式二：通过包管理器

```bash
# macOS
brew install pngquant oxipng

# Ubuntu/Debian
sudo apt install pngquant
cargo install oxipng

# Windows (scoop)
scoop install pngquant oxipng
```

---

## 基本用法

### 单文件压缩

```bash
# pngquant：quality=70-90，视觉无损
pngquant --quality=70-90 --speed 1 --ext .png --force input.png

# oxipng：进一步无损优化
oxipng -o 4 input.png
```

### 批量压缩（指定目录）

```bash
# 压缩当前目录所有 PNG
for %f in (*.png) do (
  pngquant --quality=70-90 --speed 1 --ext .png --force "%f"
  oxipng -o 4 "%f"
)
```

### 压缩后替换原文件

```bash
# pngquant 默认输出 *_fs8.png，加 --ext .png --force 直接覆盖原文件
pngquant --quality=70-90 --speed 1 --ext .png --force *.png
```

---

## 参数说明

### pngquant

| 参数 | 说明 | 建议值 |
|------|------|-------|
| `--quality=min-max` | 质量控制，0-100，数值越高画质越好 | `70-90`（视觉无损） |
| `--speed 1` | 速度 1-10，1 最慢但压缩率最高 | `1` |
| `--ext .png` | 输出扩展名，配合 `--force` 覆盖原文件 | |
| `--force` | 覆盖已有文件 | |
| `--skip-if-larger` | 如果压缩后反而更大则跳过 | 可选 |

### oxipng

| 参数 | 说明 | 建议值 |
|------|------|-------|
| `-o 4` | 优化级别 0-6，越高压缩率越大但越慢 | `4`（平衡速度和大小） |
| `-o 6` | 最高级别，非常慢但压缩率最高 | 离线处理可用 |
| `--strip safe` | 安全删除元数据（保留透明度等） | 默认 |

---

## 实战：压缩项目图库

以本项目的图库为例：

```bash
# 1. 进入图库目录
cd E:\App\AgnesImages\hanfusite\src\static\gallery\tang

# 2. pngquant 批量压缩
"%TEMP%\pngquant\pngquant.exe" --quality=70-90 --speed 1 --ext .png --force *.png

# 3. oxipng 进一步优化
oxipng -o 4 *.png

# 4. 同样处理 song 目录
cd ..\song
"%TEMP%\pngquant\pngquant.exe" --quality=70-90 --speed 1 --ext .png --force *.png
oxipng -o 4 *.png
```

### 实际效果参考

| 指标 | 压缩前 | 压缩后 | 减少 |
|------|-------|-------|------|
| 单张大小 | ~1.5 MB | ~500 KB | ~65% |
| 64 张合计 | ~97 MB | ~34 MB | ~63 MB |

---

## 注意事项

1. **先 pngquant 再 oxipng**：oxipng 对已量化的 PNG 效果更好
2. **quality 不要低于 60**：低于 60 会出现可见色块
3. **保留原始备份**：关键图片先在副本上测试
4. **WebP 替代方案**：如果需要更高压缩率，可考虑转 WebP（但兼容性较差）
5. **pngquant 对有透明通道的 PNG 也有效**，透明度保持良好

---

## 常见问题

### Q: 压缩后文件反而变大了？
A: 某些小尺寸或已高度优化的 PNG 可能无法进一步压缩，加 `--skip-if-larger` 跳过。

### Q: 压缩后颜色数量减少，出现条纹？
A: 降低 `--quality` 下限（设为 80-95），或去掉 `--speed 1` 使用默认速度。

### Q: 怎么批量压缩子目录？
```bash
for /r E:\path\to\images %f in (*.png) do (
  pngquant --quality=70-90 --speed 1 --ext .png --force "%f"
)
```

### Q: 有没有在线版？
- **TinyPNG** (tinypng.com) — 网页拖拽批量处理，效果接近 pngquant
- **Squoosh** (squoosh.app) — Google 出品，支持多种格式
