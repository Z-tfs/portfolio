# PROGRESS

## 已完成
- 2026-09-27 骨架：Astro 7 静态站、en/zh 路由、作品 schema、Header（文字版）、Surprise 开关挂载点、2 个假作品、正式部署 + PR 预览 workflow、docs/references 目录。

## 下一步
- 确认 GitHub Pages 设置，检查首个 PR 预览能否打开。
- Index：LIST / GRID 切换、排序、TYPE / TOOLS / YEAR 筛选（写进 URL 参数）、hover 封面预览。
- CV：entries.yaml / profiles.yaml、CV 排版页、Playwright 生成 PDF。
- Info 页：src/content/info.md 叙述式简介、精选经历、联系方式。
- 字体接入（fonts.css）、网格变量取值、`<Vimeo>` 和短循环视频组件。

## 已知问题
- 正文用 `<Bi>` 双语组件时，作品文件需要是 `.mdx`（`.md` 不支持组件）。loader 两种都接受。
- Markdown 图片的 alt 只能写一种语言；双语 alt 需要之后做图片组件。
- CV 路由目前只有一个 `placeholder` profile。
- 首次预览前 gh-pages 分支还不存在，需要先由 workflow 创建，再去设置 Pages。

## 待我决定
- 中文字体、旧站字号、Opening 动态、Surprise 玩法、CV profile 列表、Canvas 视图、自定义域名。
- 作品文件统一用 `.mdx` 还是 `.md`（需要插组件时必须用 .mdx）。
