import { parse } from "smol-toml";
import { z } from "zod";
const pageModules = import.meta.glob("../config/pages/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const sectionBaseSchema = z.object({
  id: z.string().optional(),
});

const heroSectionSchema = sectionBaseSchema.extend({
  type: z.literal("hero"),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string(),
  primaryText: z.string().optional(),
  primaryHref: z.string().optional(),
  secondaryText: z.string().optional(),
  secondaryHref: z.string().optional(),
  badges: z.array(z.string()).optional(),
});

const featureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const featureGridSectionSchema = sectionBaseSchema.extend({
  type: z.literal("featureGrid"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(featureItemSchema).min(1),
});

const statsItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  hint: z.string().optional(),
});

const statsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("stats"),
  title: z.string().optional(),
  description: z.string().optional(),
  items: z.array(statsItemSchema).min(1),
});

const collectionPreviewSectionSchema = sectionBaseSchema.extend({
  type: z.literal("collectionPreview"),
  title: z.string(),
  description: z.string().optional(),
  collection: z.enum(["blog", "news", "projects"]),
  limit: z.number().int().positive().default(3),
  viewAllHref: z.string().optional(),
  viewAllText: z.string().optional(),
  emptyMessage: z.string().optional(),
  homepageOnly: z.boolean().default(false),
});

const galleryItemSchema = z.object({
  title: z.string(),
  image: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
});

const gallerySectionSchema = sectionBaseSchema.extend({
  type: z.literal("gallery"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(galleryItemSchema).min(1),
});

const ctaSectionSchema = sectionBaseSchema.extend({
  type: z.literal("cta"),
  title: z.string(),
  description: z.string().optional(),
  primaryText: z.string(),
  primaryHref: z.string(),
});

const richTextSectionSchema = sectionBaseSchema.extend({
  type: z.literal("richText"),
  title: z.string().optional(),
  content: z.string(),
});

const joinFormSectionSchema = sectionBaseSchema.extend({
  type: z.literal("joinForm"),
  title: z.string().optional(),
  description: z.string().optional(),
  endpointEnv: z.string().default("PUBLIC_JOIN_FORM_ENDPOINT"),
  successMessage: z.string().optional(),
  failureMessage: z.string().optional(),
});

const sectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  featureGridSectionSchema,
  statsSectionSchema,
  collectionPreviewSectionSchema,
  gallerySectionSchema,
  ctaSectionSchema,
  richTextSectionSchema,
  joinFormSectionSchema,
]);

const pageCompositionSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sections: z.array(sectionSchema).default([]),
});

export type PageComposition = z.infer<typeof pageCompositionSchema>;
export type PageSection = PageComposition["sections"][number];
export type CollectionName = Extract<
  PageSection,
  {
    type: "collectionPreview";
  }
>["collection"];

export async function getPageComposition(name: string): Promise<PageComposition> {
  const modulePath = `../config/pages/${name}.toml`;
  const content = pageModules[modulePath];

  if (!content) {
    throw new Error(`Page composition not found: ${modulePath}`);
  }

  const parsed = parse(content);
  return pageCompositionSchema.parse(parsed);
}
