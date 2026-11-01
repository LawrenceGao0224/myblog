import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 每篇文章一個資料夾：index.md 是中文、index.en.md 是英文，照片共用
const schema = ({ image }: { image: () => z.ZodType }) =>
  z.object({
    title: z.string(),
    description: z.string().default(''),
    published: z.coerce.date(),
    cover: image().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
  });

// 文章網址用資料夾名稱
const folderId = ({ entry }: { entry: string }) => entry.split('/')[0];

const posts = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/posts', generateId: folderId }),
  schema,
});

const postsEn = defineCollection({
  loader: glob({ pattern: '*/index.en.md', base: './src/content/posts', generateId: folderId }),
  schema,
});

export const collections = { posts, postsEn };
