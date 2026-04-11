import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import * as z from "zod";

const basePostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  homepage: z.boolean().default(false),
  sticky: z.number().int().nonnegative().default(9999),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: basePostSchema.extend({
    series: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: basePostSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: basePostSchema.extend({
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog,
  news,
  projects,
};
