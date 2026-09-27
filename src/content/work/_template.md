---
# 新作品模板：复制这个文件，改名为 [slug].md（slug 用英文小写和连字符，会出现在网址里）。
# 图片和短视频放在 src/assets/work/[slug]/，文件名用两位数编号开头：01.jpg、02.mp4…
# 带 * 的是必填项，缺了会构建报错。

id: "000"                     # * 档案编号，三位数，加引号
title:                        # *
  en: ""
  zh: ""
year: 2025                    # * 2025，或带月份 "2025.03"（带月份必须加引号）
type: []                      # * 可多选：identity / editorial / social-media / art-direction / motion / product / web / art
tools: []                     # * 如 [indesign, photoshop]；中英名称在 src/i18n/ui.ts 的 toolLabels
# dimensions: "210 × 297 mm"  # 选填，仅实体作品
# client: ""                  # 选填
# collaborators: []           # 选填
# recognition:                # 选填，显示为描边胶囊标签
#   en: ""
#   zh: ""
intro:                        # * 项目头右栏说明
  en: ""
  zh: ""
# cover: ../../assets/work/[slug]/01.jpg   # index hover 预览 + grid 封面
featured: false
---

<!-- 正文：媒体排版，两种语言共用。 -->

![](../../assets/work/[slug]/01.jpg)

<!--
长段双语文字需要用 <Bi> 组件，这要求文件扩展名改为 .mdx：

import Bi from '../../components/Bi.astro';

<Bi>
  <Fragment slot="en">English paragraph.</Fragment>
  <Fragment slot="zh">中文段落。</Fragment>
</Bi>
-->
