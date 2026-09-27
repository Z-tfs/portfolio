# CLAUDE.md — Archive (ZQ) Portfolio

> 这份文件是网站的硬性规则。任何修改前先读完。与本文件冲突的需求，先问我，不要自行决定。
> 旧站：https://archivezq.cargo.site/ ｜ 仓库：Z-tfs/portfolio ｜ 部署：GitHub Pages
> 参考资料在 `/docs/references/`，规则见第 14 节。

---

## 1. 项目目标

- 从 Cargo 迁出，做一个我能长期维护、零订阅费的作品集。
- **保留**：黑底、瑞士网格、archive / editorial 气质、项目标题 + 类型 + 说明的三栏结构。
- **改进**：作品不再只靠静态大图；加入"像翻档案一样"的交互；视频要多、要清晰。
- 核心概念：**网站是一个档案库**，作品是被编号、被归档、可以排序和筛选的条目。
- 中英双语。

## 2. 技术栈（硬性）

- 框架：**Astro**，静态输出，GitHub Actions 构建并部署到 GitHub Pages。
- 用 Astro Content Collections 管理作品和 CV 数据，用 schema 校验必填字段。
- 用 Astro 内置 i18n 路由做双语。
- 默认不发送 JS；只有需要交互的模块才加载脚本，优先原生 JS。
- 不使用付费服务或后端。
- 代码简单可读——维护者是设计师。每次改动后列出改了哪些文件。

## 3. 网站结构

```
/                          → 根据浏览器语言跳转到 /en/ 或 /zh/
/[lang]/                   Opening + Index（同一页，见第 6 节）
/[lang]/work/[slug]        作品内页
/[lang]/info               Information：简介、精选经历、联系方式、CV 下载
/[lang]/cv/[profile]       CV 排版页（不出现在导航里，noindex，仅用于生成 PDF）
/cv/zq-cv-[profile]-[lang].pdf   构建时自动生成
```

- 全站 Header：左上 **"Z's Place"**，右侧箭头导航（→ Index / → Information / → Contact）+ 语言切换 `EN / 中` + Surprise 开关。
- 切换语言时停留在同一页的对应语言版本。

## 4. 双语规则（硬性）

- 一个作品只有**一个文件**，图片、视频、元数据共用；只有文字分语言。
- 文字字段写成 `{ en: "...", zh: "..." }`。缺某一语言时显示另一语言，构建时给出警告（不报错）。
- 界面文字统一放在 `src/i18n/ui.ts` 字典里，不在组件里写死。
- type、tools 等分类值在字典里各有中英对照。
- 中文字体：另配一款（西文字体不含汉字），做子集化。候选待定。
- 中文排版：标点挤压、行首禁则、中西文之间适当间距。

## 5. 作品数据结构（硬性）

`src/content/work/[slug].md`

```yaml
---
id: "001"            # 档案编号，三位数（必填）
title: { en: "", zh: "" }        # 必填
year:                # 必填，2025 或 2025.03
type: []             # 必填，可多选：identity / editorial / social-media / art-direction / motion / product / web / art
tools: []            # 必填
dimensions:          # 选填，仅实体作品
client:              # 选填
collaborators: []    # 选填
recognition: { en: "", zh: "" }  # 选填，描边胶囊标签（沿用旧站）
intro: { en: "", zh: "" }        # 必填，项目头右栏说明
cover:               # index hover 预览 + grid 封面
featured: false
---
正文：媒体排版，两种语言共用。长段文字用双语文字组件插入。
```

- 内页必须显示 id / year / type / tools，有 dimensions 时显示。缺必填字段 → 构建报错。
- type、tools、year 在内页里是链接，点击回到 index 并按该值筛选。

## 6. Opening + Index（首页）

不设传统"首页"。**Index 就是首页**，Opening 是它的开场。

### Opening
- 开场的具体动态：**待定**，我会另外提供动态参考。在此之前只做一个静态占位（大字 "Archive (ZQ)" + 实时日期时间），不自行设计动画。
- 以下规则已确定：
  - 向下滚动时，大字缩小并移动到 Header 左上角，Index 从下方接上。开场和目录是一个连续动作，不是两个页面。
  - 每次会话只完整播放一次；之后回到首页直接落在 Index（用 sessionStorage 记录）。
  - 可以点击或按任意键跳过。
  - 从外部链接直接进入作品页时不显示 Opening。
  - **会话从作品页开始时**，这次会话视为"已看过 Opening"：之后回到首页，直接定位在 Index，Header 为收起状态；Opening 内容仍在页面顶部，往上滚动可以看到，但不自动播放。
- `prefers-reduced-motion` 开启时不做动画。

### Index
- 默认 **List 视图**：列 = `ID | Title | Type | Tools | Year`（手机端 `ID | Title | Year`）。
- 列标题可点击排序，当前排序列标题反色 + 箭头。
- Hover 一行：整行反色，鼠标附近浮出封面预览。手机端点按展开。
- **Grid 视图**：封面网格 + 下方小字说明（编号、标题、年份、类型）。
- 右上角控制面板：`LIST / GRID`，筛选 `TYPE / TOOLS / YEAR`。
- 筛选和排序状态写进 URL 参数。
- 第二阶段（可选）：行内展开（accordion）；Canvas 视图（待定）。

## 7. Information 页 + CV（硬性）

### 数据
- 所有经历只维护一份总表：`src/content/cv/entries.yaml`。
- 每条经历包含：分类（education / experience / award / exhibition / publication / skill…）、时间、双语文字、**roles 标签**（适用于哪些头衔，如 graphic-designer / art-director / editorial-designer / publisher）、priority（1–3，决定精简版是否收录）。
- 头衔配置：`src/content/cv/profiles.yaml`，每个 profile 定义：头衔名称（双语）、收录哪些 roles、最低 priority、各分类的顺序和条数上限、`public: true/false`。

### CV PDF
- 每个 profile × 每种语言，构建时各生成一份 PDF（Playwright 渲染 `/[lang]/cv/[profile]`）。
- **PDF 一律白底黑字**，A4，保留网格和字体系统。
- `public: true` 的 profile 在 Info 页提供下载；`public: false` 的只生成文件、不公开链接，供我投递时使用。
- 更新 entries.yaml 或 profiles.yaml 并推送后，PDF 自动重新生成。
- 允许做 Surprise Mode 版 CV（网页和/或 PDF），设计待定，默认版本不受影响。

### Info 页
- **Info 页不是 CV 的网页版**，语气是自我介绍，不是条目罗列。
- 内容：一段叙述式简介（双语，单独撰写，存在 `src/content/info.md`）、精选经历（从 entries.yaml 取 priority 1 的条目，以简洁的档案式列表呈现）、联系方式、社交链接、CV 下载按钮（列出所有 public profile）。

## 8. 视觉规则

### 颜色（CSS 变量，全站只用这些）
```css
--bg:      #000000;   /* 背景 */
--text-1:  #E8E8E8;   /* 标题、正文 */
--text-2:  #A6A6A6;   /* 元数据、说明 */
--text-3:  #6E6E6E;   /* 编号、辅助信息（不用于需要阅读的长文字） */
--line:    #3D3D3D;   /* 分隔线 */
--invert-bg: var(--text-1);  /* 反色高亮 */
--invert-fg: var(--bg);
```
- 高亮 / 选中：反色。不引入新颜色。无浅色模式。

### 网格与版式
- 瑞士网格，列宽、边距、间距全部是 CSS 变量。
- 项目头：`标题（大） | 类型（小） | 说明（小）`，上下各一条细线。
- 分隔线：实线细线为主；index 行之间可用虚线 / 点线。
- 编号系统：作品和图片带小号编号，像唱片内页 tracklist / 图版目录。
- 大量留白，层级靠字号、字重、位置。

### 字体（已确定）
| 用途 | 字体 |
|---|---|
| 标题、大字、导航 | PP Neue York |
| 正文、元数据、说明、表格 | PP Editorial Sans |
| Surprise Mode 的故障 / 闪动部分 | PP Lettra Mono（只在这里用） |
| 中文 | 待定 |

- 字号：沿用旧站作品介绍字号（数值待提取）。
- 所有字体在 `src/styles/fonts.css` 一处声明。
- 上线前确认 Pangram Pangram web license。

## 9. Surprise Mode

- 默认模式永远是干净的瑞士档案风格。Surprise Mode 是用户主动打开的另一层。
- Header 开关，打开后在 `<html>` 上加 `data-mode="surprise"`。所有 playful / 故障效果只在这个属性下生效。
- 开关状态在会话内保持（sessionStorage）。
- 故障效果（1-bit 抖动预览、PP Lettra Mono、原生蓝色链接、图层错位等）归入这一层。
- 具体玩法：**待设计**。在我确定前只搭开关和挂载点，不自行发挥。
- 尊重 `prefers-reduced-motion`。

## 10. 媒体规则（硬性）

- 图片：WebP/AVIF + fallback，多尺寸 srcset，懒加载。
- 视频：
  - 大视频不进仓库（GitHub 单文件上限 100MB，仓库建议 <1GB，Pages 月流量约 100GB）。
  - 短循环（<10MB）：H.264 MP4 + WebM，放仓库，`autoplay muted loop playsinline`。
  - 长视频 / 高清：**Vimeo**，嵌入时隐藏标题、头像、logo 等播放器 UI，统一用一个 `<Vimeo>` 组件。
  - 所有视频必须有 poster。
- 清晰度优先，不允许压到明显糊。

## 11. 作品内页

- 顶部：项目头 + 元数据表。
- 正文自由混排：全宽图、双栏图、编号图版网格、视频、自定义交互模块。
- 交互模块以组件插入。
- 底部：上一个 / 下一个作品（按编号）。

## 12. 通用要求

- 移动端完整可用。
- 首屏快，动效不阻塞内容。
- 可访问性：双语 alt、足够对比度、键盘可操作。
- 每页正确的 `lang` 与 `hreflang`。

## 13. 待决定事项

- [ ] 中文字体
- [ ] 旧站字号精确数值
- [ ] Opening 动态
- [ ] Surprise Mode 玩法（含 Surprise 版 CV）
- [ ] CV 的 profile 列表
- [ ] Canvas 视图要不要做
- [ ] 自定义域名（将来）

## 14. 参考资料规则

```
/docs/references/
  global/          整体调性（所有页面都参考）
  opening/         Opening 动态
  index/           Index 列表 / 网格
  hover/           hover 效果
  work-page/       作品内页
  info-cv/         Info 页和 CV
  surprise/        Surprise Mode
  REFERENCES.md    每张参考图的说明
```

- 每加一张参考，在 REFERENCES.md 里写一条：文件名 → 用在哪里 → **取什么** → **不要什么**。
  - 例：`index/table-pixel.png` → Index List 视图 → 取：列结构、整行反色、控制面板 → 不要：像素字体、白底
- 只按"取什么"使用参考，其余部分一律不照搬。
- 动态参考：Claude Code 看不了视频。提供 3–6 张关键帧截图（按顺序编号）+ 一段文字描述（触发方式、时长、缓动、起止状态）；有线上网址的一并附上。
- 参考与本文件冲突时，以本文件为准。

## 15. 工作流程（每次对话都遵守）

### 开始时
1. `git pull`（我可能在 GitHub 网页上直接改过内容）。
2. 读 `docs/PROGRESS.md`。**不要为了"了解项目"通读整个仓库**，只打开和本次任务相关的文件。
3. 参考图只在任务需要时查看，并先读 `docs/references/REFERENCES.md` 找到对应的那几张。
4. 任务较大（涉及 3 个以上文件或新功能）时，先用几行说明计划，等我确认再动手。

### 进行中
- 每个任务一个分支，完成后开 PR 到 `main`。不直接推 `main`。
- 不确定的设计决定：问我，不要猜。

### 结束时（必须）
1. 确认 `npm run build` 通过。
2. 更新 `docs/PROGRESS.md`：已完成 / 下一步 / 已知问题 / 待我决定。整份文件保持在 40 行以内，旧条目压缩成一行。
3. 如果本次对话确定了新的规则，同步更新本文件对应章节和第 13 节。
4. 回复我时用这个格式，不要长篇总结：
   ```
   预览：<PR 预览链接>
   改了：<文件列表>
   请检查：<1–3 件我要亲眼确认的事>
   ```

### 预览部署
- 每个 PR 自动部署预览到 `https://z-tfs.github.io/portfolio/pr-preview/pr-<编号>/`（用 `rossjrw/pr-preview-action`；Astro 的 `base` 通过环境变量按预览路径设置）。
- PR 合并或关闭后预览自动删除。
- 合并到 `main` 后正式站 `https://z-tfs.github.io/portfolio/` 自动更新。
- Pages 来源为 `gh-pages` 分支；正式部署时不能删掉 `pr-preview/` 目录。

### 内容文件约定
- 新作品模板：`src/content/work/_template.md`（下划线开头的文件不参与构建）。
- 作品图片和短视频：`src/assets/work/[slug]/`，文件名用两位数编号开头：`01.jpg`、`02.mp4`…
- 长视频只填 Vimeo ID。
