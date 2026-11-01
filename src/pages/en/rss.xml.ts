import type { APIContext } from 'astro';
import { feed } from '../../rss';

export const GET = (context: APIContext) => feed('en', context.site!);
