import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 双语文字字段：{ en: "...", zh: "..." }，至少填一种语言
const localized = z
  .object({ en: z.string().optional(), zh: z.string().optional() })
  .refine((v) => Boolean(v.en || v.zh), { message: '至少要填 en 或 zh 其中一种' });

// 作品类型。改这里时同步改 src/i18n/ui.ts 里的 typeLabels
export const workTypes = [
  'identity',
  'editorial',
  'social-media',
  'art-direction',
  'motion',
  'product',
  'web',
  'art',
] as const;

const work = defineCollection({
  // 下划线开头的文件（如 _template.md）不参与构建
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      id: z.string().regex(/^\d{3}$/, { message: 'id 必须是三位数字字符串，如 "001"' }),
      title: localized,
      // 年份：2025 或 "2025.03"（带月份时必须加引号，否则 2025.10 会被读成 2025.1）
      year: z.union([
        z.number().int().min(1900).max(2100).transform(String),
        z.string().regex(/^\d{4}(\.\d{2})?$/, { message: 'year 写成 2025 或 "2025.03"' }),
      ]),
      type: z.array(z.enum(workTypes)).min(1, { message: 'type 至少选一个' }),
      tools: z.array(z.string()).min(1, { message: 'tools 至少填一个' }),
      dimensions: z.string().optional(),
      client: z.string().optional(),
      collaborators: z.array(z.string()).default([]),
      recognition: localized.optional(),
      intro: localized,
      cover: image().optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { work };
