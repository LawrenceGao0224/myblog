import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      published: z.coerce.date(),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      toc: z.boolean().default(true),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
