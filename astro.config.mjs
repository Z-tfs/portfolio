// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// 部署路径：正式站 /portfolio/，PR 预览 /portfolio/pr-preview/pr-<编号>/
// 由 GitHub Actions 通过环境变量 BASE_PATH 传入；本地开发默认 /portfolio/。
const base = process.env.BASE_PATH || '/portfolio/';

export default defineConfig({
  site: 'https://z-tfs.github.io',
  base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [mdx()],
  // 图片默认生成多尺寸 srcset（CLAUDE.md 第 10 节）
  image: { layout: 'constrained' },
  build: {
    // 默认是 _astro/，下划线目录会被 GitHub Pages 的 Jekyll 忽略，所以改名
    assets: 'assets',
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // 根路径 / 由 src/pages/index.astro 按浏览器语言跳转
      redirectToDefaultLocale: false,
    },
  },
});
