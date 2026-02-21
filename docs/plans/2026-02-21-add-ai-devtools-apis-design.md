# Design: Add AI & Developer Tool APIs

**Date:** 2026-02-21
**Author:** Claude
**Status:** Approved

## Context

The collection (~1,226 APIs) is missing many modern, widely-used APIs in the AI/ML and Developer Tools spaces. These are among the most actively used APIs in 2025-2026 and their absence is a significant gap in the collection.

## Goal

Add ~40 new YAML entries for missing AI/ML and Developer Tool APIs using a hybrid approach: write from knowledge for structure, use Firecrawl to verify URLs and descriptions for complex/changing entries.

## Target APIs

### AI & ML (~18)
| Slug | Name |
|------|------|
| `openai` | OpenAI API |
| `anthropic` | Anthropic Claude API |
| `google-gemini` | Google Gemini API |
| `mistral-ai` | Mistral AI |
| `groq` | Groq |
| `hugging-face` | Hugging Face Inference API |
| `cohere` | Cohere |
| `together-ai` | Together AI |
| `replicate` | Replicate |
| `stability-ai` | Stability AI |
| `perplexity-ai` | Perplexity AI |
| `elevenlabs` | ElevenLabs |
| `deepl` | DeepL |
| `assemblyai` | AssemblyAI |
| `deepgram` | Deepgram |
| `fal-ai` | fal.ai |
| `fireworks-ai` | Fireworks AI |
| `aws-bedrock` | AWS Bedrock |

### Developer Tools (~22)
| Slug | Name |
|------|------|
| `vercel` | Vercel |
| `supabase` | Supabase |
| `railway` | Railway |
| `render` | Render |
| `neon` | Neon |
| `planetscale` | PlanetScale |
| `upstash` | Upstash |
| `resend` | Resend |
| `clerk` | Clerk |
| `liveblocks` | Liveblocks |
| `convex` | Convex |
| `turso` | Turso |
| `fly-io` | Fly.io |
| `cloudflare-workers` | Cloudflare Workers |
| `deno-deploy` | Deno Deploy |
| `sentry` | Sentry |
| `posthog` | PostHog |
| `grafana` | Grafana |
| `linear` | Linear |
| `notion` | Notion API |
| `airtable` | Airtable |
| `figma` | Figma |

## Approach: Hybrid

1. **Knowledge-based creation**: Write all 40 YAML files directly from training knowledge (fast, reliable for well-known APIs).
2. **Firecrawl spot-check**: Verify URLs and descriptions for ~10 that change frequently (OpenAI, Anthropic, Google Gemini, Groq, etc.).
3. **Duplicate check**: Before creating each file, verify slug doesn't already exist in `/collection/`.

## File Format

Follows existing schema (`/src/schema.ts`):
```yaml
name: <API Name>
slug: <slug>
description: <one-line description>
categories:
  - <category from categories.yaml>
type: REST
is_free: true|false
links:
  - name: Docs / Website
    url: https://...
```

## Files to Create

All new files go in: `/Users/yevhen/Code/github.com/tools-collection/apis-collection/collection/`

## Quality Gates
- Cross-check each slug against existing collection before creating
- Only use official documentation URLs
- Categories must match entries in `categories.yaml`
