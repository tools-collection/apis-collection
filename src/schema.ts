import { z } from "zod";

export const linkSchema = z.object({
  name: z.string(),
  url: z.string().url().optional(),
});

export const librarySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  documentation_url: z.string().optional(),
  source_code_url: z.string().optional(),
  version: z.string().optional(),
  platform: z.string().optional(),
  author: z.string().optional(),
  stargazers_count: z.number().int().optional(),
});

export const specificationSchema = z.object({
  type: z.string().optional(),
  url: z.string().optional(),
  version: z.string().optional(),
});

export const authType = z.enum(["none", "api_key", "oauth2", "bearer", "basic"]).optional();

export const apiSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  categories: z.array(z.string()).min(1),
  type: z.string().optional(),
  is_free: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((v) => (v === true || v === "true" ? true : v === false || v === "false" ? false : undefined)),
  is_active: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((v) => (v === false || v === "false" ? false : true)),
  logo: z.string().url().optional(),
  contact: z.string().optional(),
  discussion_url: z.string().url().optional(),
  auth_type: authType,
  rate_limits: z.string().optional(),
  tags: z.array(z.string()).optional(),
  specification: specificationSchema.optional(),
  links: z.array(linkSchema).optional(),
  libraries: z.array(librarySchema).optional(),
});

export type Api = z.infer<typeof apiSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Library = z.infer<typeof librarySchema>;
export type Specification = z.infer<typeof specificationSchema>;

export const categorySchema = z.record(z.string(), z.string());
export type Categories = z.infer<typeof categorySchema>;
