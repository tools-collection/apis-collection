# Add AI & Developer Tool APIs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add ~40 new YAML files to `/collection/` for prominent AI/ML and Developer Tool APIs currently missing from the collection.

**Architecture:** Each API gets a single YAML file in `/collection/{slug}.yaml` following the schema in `/src/schema.ts`. Use hybrid approach: write from knowledge, Firecrawl-verify URLs for the most volatile entries (OpenAI, Anthropic, Gemini, Groq).

**Tech Stack:** YAML files, existing schema validation (`src/schema.ts`), Firecrawl for URL verification.

---

## Pre-flight: Duplicate Check

Before creating any file, verify no slug already exists:

```bash
ls /Users/yevhen/Code/github.com/tools-collection/apis-collection/collection/ | grep -E "openai|anthropic|gemini|mistral|groq|hugging-face|cohere|together-ai|replicate|stability-ai|perplexity|elevenlabs|deepl|assemblyai|deepgram|fal-ai|fireworks|bedrock|vercel|supabase|railway|render|neon|planetscale|upstash|resend|clerk|liveblocks|convex|turso|fly-io|cloudflare-workers|deno-deploy|sentry|posthog|grafana|linear|notion|airtable|figma"
```

Expected: only slugs that DON'T already exist should be created.

---

### Task 1: AI/ML APIs — OpenAI, Anthropic, Gemini (Firecrawl-verify)

**Files:**
- Create: `collection/openai.yaml`
- Create: `collection/anthropic.yaml`
- Create: `collection/google-gemini.yaml`

**Step 1: Firecrawl-verify official docs URLs**

Use Firecrawl to confirm current docs URLs:
- `https://platform.openai.com/docs`
- `https://docs.anthropic.com`
- `https://ai.google.dev/gemini-api/docs`

**Step 2: Create `collection/openai.yaml`**

```yaml
name: OpenAI
slug: openai
description: OpenAI's API provides access to GPT-4, GPT-4o, DALL-E, Whisper, and Embeddings models. Build AI-powered applications for text generation, image generation, speech recognition, and more.
categories:
  - AI & ML
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://platform.openai.com/docs
  - name: API Reference
    url: https://platform.openai.com/docs/api-reference
```

**Step 3: Create `collection/anthropic.yaml`**

```yaml
name: Anthropic Claude
slug: anthropic
description: Anthropic's API provides access to the Claude family of AI models (Claude 3.5, Claude 3 Opus, Sonnet, Haiku) for text generation, analysis, coding assistance, and vision tasks.
categories:
  - AI & ML
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.anthropic.com
  - name: API Reference
    url: https://docs.anthropic.com/en/api/getting-started
```

**Step 4: Create `collection/google-gemini.yaml`**

```yaml
name: Google Gemini API
slug: google-gemini
description: Google's Gemini API provides access to Gemini 1.5 Pro, Flash, and other multimodal models for text, image, video, and audio understanding and generation.
categories:
  - AI & ML
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://ai.google.dev/gemini-api/docs
  - name: API Reference
    url: https://ai.google.dev/api/rest
```

**Step 5: Commit**

```bash
git add collection/openai.yaml collection/anthropic.yaml collection/google-gemini.yaml
git commit -m "feat: add OpenAI, Anthropic, and Google Gemini API entries"
```

---

### Task 2: AI/ML APIs — Mistral, Groq, Hugging Face (Firecrawl-verify)

**Files:**
- Create: `collection/mistral-ai.yaml`
- Create: `collection/groq.yaml`
- Create: `collection/hugging-face.yaml`

**Step 1: Firecrawl-verify**
- `https://docs.mistral.ai`
- `https://console.groq.com/docs`
- `https://huggingface.co/docs/api-inference`

**Step 2: Create `collection/mistral-ai.yaml`**

```yaml
name: Mistral AI
slug: mistral-ai
description: Mistral AI provides access to open and proprietary language models including Mistral Large, Mistral Small, and Codestral for text generation, coding, and embeddings.
categories:
  - AI & ML
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.mistral.ai
  - name: API Reference
    url: https://docs.mistral.ai/api
```

**Step 3: Create `collection/groq.yaml`**

```yaml
name: Groq
slug: groq
description: Groq's API provides ultra-fast inference for open-source language models like Llama 3, Mixtral, and Gemma using custom LPU hardware. Optimized for low-latency applications.
categories:
  - AI & ML
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://console.groq.com/docs
  - name: API Reference
    url: https://console.groq.com/docs/openai
```

**Step 4: Create `collection/hugging-face.yaml`**

```yaml
name: Hugging Face Inference API
slug: hugging-face
description: Hugging Face Inference API gives access to thousands of open-source ML models hosted on the Hub. Run NLP, computer vision, audio, and multimodal models via a simple REST API.
categories:
  - AI & ML
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://huggingface.co/docs/api-inference
  - name: Models Hub
    url: https://huggingface.co/models
```

**Step 5: Commit**

```bash
git add collection/mistral-ai.yaml collection/groq.yaml collection/hugging-face.yaml
git commit -m "feat: add Mistral AI, Groq, and Hugging Face API entries"
```

---

### Task 3: AI/ML APIs — Cohere, Together AI, Replicate

**Files:**
- Create: `collection/cohere.yaml`
- Create: `collection/together-ai.yaml`
- Create: `collection/replicate.yaml`

**Step 1: Create `collection/cohere.yaml`**

```yaml
name: Cohere
slug: cohere
description: Cohere's API provides NLP capabilities including text generation, embeddings, classification, and reranking. Designed for enterprise use cases like semantic search and RAG pipelines.
categories:
  - AI & ML
  - Text Analysis & Tools
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.cohere.com
  - name: API Reference
    url: https://docs.cohere.com/reference/about
```

**Step 2: Create `collection/together-ai.yaml`**

```yaml
name: Together AI
slug: together-ai
description: Together AI provides fast inference for 100+ open-source models including Llama 3, Mistral, and FLUX image models. Offers fine-tuning and dedicated deployment options.
categories:
  - AI & ML
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.together.ai
  - name: API Reference
    url: https://docs.together.ai/reference
```

**Step 3: Create `collection/replicate.yaml`**

```yaml
name: Replicate
slug: replicate
description: Replicate lets you run machine learning models via API. Access thousands of community models for image generation, language, audio, and video, or deploy your own custom models.
categories:
  - AI & ML
  - Images & Photography
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://replicate.com/docs
  - name: API Reference
    url: https://replicate.com/docs/reference/http
```

**Step 4: Commit**

```bash
git add collection/cohere.yaml collection/together-ai.yaml collection/replicate.yaml
git commit -m "feat: add Cohere, Together AI, and Replicate API entries"
```

---

### Task 4: AI/ML APIs — Stability AI, Perplexity, ElevenLabs

**Files:**
- Create: `collection/stability-ai.yaml`
- Create: `collection/perplexity-ai.yaml`
- Create: `collection/elevenlabs.yaml`

**Step 1: Create `collection/stability-ai.yaml`**

```yaml
name: Stability AI
slug: stability-ai
description: Stability AI's API provides access to Stable Diffusion and SDXL models for image generation, editing, and upscaling. Supports text-to-image, image-to-image, and inpainting.
categories:
  - AI & ML
  - Images & Photography
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://platform.stability.ai/docs/api-reference
  - name: API Reference
    url: https://platform.stability.ai/docs/api-reference
```

**Step 2: Create `collection/perplexity-ai.yaml`**

```yaml
name: Perplexity AI
slug: perplexity-ai
description: Perplexity's API provides search-augmented language model responses. Models have real-time web access and cite sources, making them ideal for research and fact-checking applications.
categories:
  - AI & ML
  - Search
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.perplexity.ai
  - name: API Reference
    url: https://docs.perplexity.ai/api-reference/chat-completions
```

**Step 3: Create `collection/elevenlabs.yaml`**

```yaml
name: ElevenLabs
slug: elevenlabs
description: ElevenLabs API provides AI voice generation and cloning. Generate realistic speech from text with customizable voices, or clone a voice from an audio sample.
categories:
  - AI & ML
  - Voice
  - Music & Audio
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://elevenlabs.io/docs
  - name: API Reference
    url: https://elevenlabs.io/docs/api-reference/getting-started
```

**Step 4: Commit**

```bash
git add collection/stability-ai.yaml collection/perplexity-ai.yaml collection/elevenlabs.yaml
git commit -m "feat: add Stability AI, Perplexity AI, and ElevenLabs API entries"
```

---

### Task 5: AI/ML APIs — DeepL, AssemblyAI, Deepgram

**Files:**
- Create: `collection/deepl.yaml`
- Create: `collection/assemblyai.yaml`
- Create: `collection/deepgram.yaml`

**Step 1: Create `collection/deepl.yaml`**

```yaml
name: DeepL
slug: deepl
description: DeepL API provides high-quality machine translation for 30+ languages. Known for producing more natural translations than competitors, with support for documents and glossaries.
categories:
  - AI & ML
  - Translation
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://developers.deepl.com/docs
  - name: API Reference
    url: https://developers.deepl.com/docs/api-reference
```

**Step 2: Create `collection/assemblyai.yaml`**

```yaml
name: AssemblyAI
slug: assemblyai
description: AssemblyAI's API provides speech-to-text transcription, speaker diarization, sentiment analysis, topic detection, and summarization from audio and video files.
categories:
  - AI & ML
  - Voice
  - Music & Audio
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://www.assemblyai.com/docs
  - name: API Reference
    url: https://www.assemblyai.com/docs/api-reference
```

**Step 3: Create `collection/deepgram.yaml`**

```yaml
name: Deepgram
slug: deepgram
description: Deepgram's API offers real-time and batch speech recognition with high accuracy. Features include speaker detection, smart formatting, language detection, and custom model training.
categories:
  - AI & ML
  - Voice
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://developers.deepgram.com/docs
  - name: API Reference
    url: https://developers.deepgram.com/reference
```

**Step 4: Commit**

```bash
git add collection/deepl.yaml collection/assemblyai.yaml collection/deepgram.yaml
git commit -m "feat: add DeepL, AssemblyAI, and Deepgram API entries"
```

---

### Task 6: AI/ML APIs — fal.ai, Fireworks AI, AWS Bedrock

**Files:**
- Create: `collection/fal-ai.yaml`
- Create: `collection/fireworks-ai.yaml`
- Create: `collection/aws-bedrock.yaml`

**Step 1: Create `collection/fal-ai.yaml`**

```yaml
name: fal.ai
slug: fal-ai
description: fal.ai provides fast inference for generative media models including FLUX, Stable Diffusion, Kling, and others. Optimized for real-time image and video generation use cases.
categories:
  - AI & ML
  - Images & Photography
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://fal.ai/docs
  - name: API Reference
    url: https://fal.ai/docs/rest-api
```

**Step 2: Create `collection/fireworks-ai.yaml`**

```yaml
name: Fireworks AI
slug: fireworks-ai
description: Fireworks AI offers fast, cost-efficient inference for open-source language and image models. Supports Llama, Mistral, Stable Diffusion, and fine-tuned custom models.
categories:
  - AI & ML
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.fireworks.ai
  - name: API Reference
    url: https://docs.fireworks.ai/api-reference/introduction
```

**Step 3: Create `collection/aws-bedrock.yaml`**

```yaml
name: AWS Bedrock
slug: aws-bedrock
description: Amazon Bedrock is a fully managed service that provides access to foundation models from Anthropic, Meta, Mistral, Stability AI, and Amazon via a single API with enterprise security.
categories:
  - AI & ML
  - Cloud
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://docs.aws.amazon.com/bedrock
  - name: API Reference
    url: https://docs.aws.amazon.com/bedrock/latest/APIReference
```

**Step 4: Commit**

```bash
git add collection/fal-ai.yaml collection/fireworks-ai.yaml collection/aws-bedrock.yaml
git commit -m "feat: add fal.ai, Fireworks AI, and AWS Bedrock API entries"
```

---

### Task 7: Dev Tools — Vercel, Supabase, Railway

**Files:**
- Create: `collection/vercel.yaml`
- Create: `collection/supabase.yaml`
- Create: `collection/railway.yaml`

**Step 1: Create `collection/vercel.yaml`**

```yaml
name: Vercel
slug: vercel
description: Vercel's API lets you manage deployments, domains, environment variables, projects, and teams programmatically. Integrates with Git to automate frontend deployment workflows.
categories:
  - Development
  - Files & Storage
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://vercel.com/docs/rest-api
  - name: API Reference
    url: https://vercel.com/docs/rest-api/endpoints
```

**Step 2: Create `collection/supabase.yaml`**

```yaml
name: Supabase
slug: supabase
description: Supabase is an open-source Firebase alternative offering a RESTful API over PostgreSQL, real-time subscriptions, authentication, file storage, and Edge Functions.
categories:
  - Development
  - Databases
  - Authentication & User Management
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://supabase.com/docs
  - name: API Reference
    url: https://supabase.com/docs/guides/api
```

**Step 3: Create `collection/railway.yaml`**

```yaml
name: Railway
slug: railway
description: Railway's API enables programmatic management of projects, services, deployments, and environments on the Railway cloud platform.
categories:
  - Development
type: GraphQL
is_free: true
links:
  - name: Docs / Website
    url: https://docs.railway.app
  - name: API Reference
    url: https://docs.railway.app/reference/public-api
```

**Step 4: Commit**

```bash
git add collection/vercel.yaml collection/supabase.yaml collection/railway.yaml
git commit -m "feat: add Vercel, Supabase, and Railway API entries"
```

---

### Task 8: Dev Tools — Render, Neon, PlanetScale

**Files:**
- Create: `collection/render.yaml`
- Create: `collection/neon.yaml`
- Create: `collection/planetscale.yaml`

**Step 1: Create `collection/render.yaml`**

```yaml
name: Render
slug: render
description: Render's API lets you manage web services, static sites, databases, cron jobs, and private services on the Render cloud platform programmatically.
categories:
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://render.com/docs/api
  - name: API Reference
    url: https://api-docs.render.com/reference
```

**Step 2: Create `collection/neon.yaml`**

```yaml
name: Neon
slug: neon
description: Neon's API manages serverless Postgres databases, branches, compute endpoints, and projects. Neon offers database branching, autoscaling, and scale-to-zero for modern apps.
categories:
  - Development
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://neon.tech/docs
  - name: API Reference
    url: https://api-docs.neon.tech/reference
```

**Step 3: Create `collection/planetscale.yaml`**

```yaml
name: PlanetScale
slug: planetscale
description: PlanetScale's API provides programmatic access to manage MySQL-compatible databases, branches, deploy requests, and organizations on the PlanetScale platform.
categories:
  - Development
  - Databases
type: REST
is_free: false
links:
  - name: Docs / Website
    url: https://planetscale.com/docs
  - name: API Reference
    url: https://api-docs.planetscale.com
```

**Step 4: Commit**

```bash
git add collection/render.yaml collection/neon.yaml collection/planetscale.yaml
git commit -m "feat: add Render, Neon, and PlanetScale API entries"
```

---

### Task 9: Dev Tools — Upstash, Resend, Clerk

**Files:**
- Create: `collection/upstash.yaml`
- Create: `collection/resend.yaml`
- Create: `collection/clerk.yaml`

**Step 1: Create `collection/upstash.yaml`**

```yaml
name: Upstash
slug: upstash
description: Upstash provides serverless Redis and Kafka with a REST API. Designed for edge and serverless environments with per-request pricing and global low-latency replication.
categories:
  - Development
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://upstash.com/docs
  - name: Redis REST API
    url: https://upstash.com/docs/redis/features/restapi
```

**Step 2: Create `collection/resend.yaml`**

```yaml
name: Resend
slug: resend
description: Resend is an email API built for developers. Send transactional emails with React components, track deliverability, manage domains, and view analytics via a simple REST API.
categories:
  - Email & SMS
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://resend.com/docs
  - name: API Reference
    url: https://resend.com/docs/api-reference/introduction
```

**Step 3: Create `collection/clerk.yaml`**

```yaml
name: Clerk
slug: clerk
description: Clerk's API handles authentication and user management including sign-up, sign-in, MFA, SSO, and user profiles. Provides embeddable UI components and backend SDKs.
categories:
  - Authentication & User Management
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://clerk.com/docs
  - name: API Reference
    url: https://clerk.com/docs/reference/backend-api
```

**Step 4: Commit**

```bash
git add collection/upstash.yaml collection/resend.yaml collection/clerk.yaml
git commit -m "feat: add Upstash, Resend, and Clerk API entries"
```

---

### Task 10: Dev Tools — Liveblocks, Convex, Turso

**Files:**
- Create: `collection/liveblocks.yaml`
- Create: `collection/convex.yaml`
- Create: `collection/turso.yaml`

**Step 1: Create `collection/liveblocks.yaml`**

```yaml
name: Liveblocks
slug: liveblocks
description: Liveblocks API enables real-time collaboration features including presence, live cursors, shared state, comments, and notifications. Build collaborative document editors and multiplayer experiences.
categories:
  - Development
  - Collaboration
  - Chats & Messaging
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://liveblocks.io/docs
  - name: API Reference
    url: https://liveblocks.io/docs/api-reference/rest-api-endpoints
```

**Step 2: Create `collection/convex.yaml`**

```yaml
name: Convex
slug: convex
description: Convex is a backend-as-a-service platform offering a reactive database, serverless functions, file storage, and real-time subscriptions accessible via TypeScript SDK and HTTP actions.
categories:
  - Development
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://docs.convex.dev
  - name: HTTP Actions
    url: https://docs.convex.dev/functions/http-actions
```

**Step 3: Create `collection/turso.yaml`**

```yaml
name: Turso
slug: turso
description: Turso provides edge SQLite databases powered by libSQL. API manages databases, groups, and organizations with support for embedded replicas and multi-tenant architectures.
categories:
  - Development
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://docs.turso.tech
  - name: Platform API
    url: https://docs.turso.tech/api-reference
```

**Step 4: Commit**

```bash
git add collection/liveblocks.yaml collection/convex.yaml collection/turso.yaml
git commit -m "feat: add Liveblocks, Convex, and Turso API entries"
```

---

### Task 11: Dev Tools — Fly.io, Cloudflare Workers, Deno Deploy

**Files:**
- Create: `collection/fly-io.yaml`
- Create: `collection/cloudflare-workers.yaml`
- Create: `collection/deno-deploy.yaml`

**Step 1: Create `collection/fly-io.yaml`**

```yaml
name: Fly.io
slug: fly-io
description: Fly.io API enables programmatic management of applications, machines, volumes, and networking on the Fly.io global platform. Deploy Docker containers close to users worldwide.
categories:
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://fly.io/docs
  - name: Machines API
    url: https://fly.io/docs/machines/api
```

**Step 2: Create `collection/cloudflare-workers.yaml`**

```yaml
name: Cloudflare Workers
slug: cloudflare-workers
description: Cloudflare Workers API manages serverless functions deployed to Cloudflare's global edge network, including KV storage, D1 databases, R2 object storage, and Queues.
categories:
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://developers.cloudflare.com/workers
  - name: API Reference
    url: https://developers.cloudflare.com/api
```

**Step 3: Create `collection/deno-deploy.yaml`**

```yaml
name: Deno Deploy
slug: deno-deploy
description: Deno Deploy API manages projects and deployments on Deno's edge JavaScript/TypeScript runtime. Deploy serverless functions globally with built-in TypeScript support and no configuration.
categories:
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://docs.deno.com/deploy
  - name: API Reference
    url: https://apidocs.deno.com
```

**Step 4: Commit**

```bash
git add collection/fly-io.yaml collection/cloudflare-workers.yaml collection/deno-deploy.yaml
git commit -m "feat: add Fly.io, Cloudflare Workers, and Deno Deploy API entries"
```

---

### Task 12: Dev Tools — Sentry, PostHog, Grafana

**Files:**
- Create: `collection/sentry.yaml`
- Create: `collection/posthog.yaml`
- Create: `collection/grafana.yaml`

**Step 1: Create `collection/sentry.yaml`**

```yaml
name: Sentry
slug: sentry
description: Sentry's API provides access to error events, issues, projects, organizations, and releases. Integrate Sentry's error monitoring and performance tracking into CI/CD pipelines.
categories:
  - Development
  - Analytics
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://docs.sentry.io/api
  - name: API Reference
    url: https://docs.sentry.io/api
```

**Step 2: Create `collection/posthog.yaml`**

```yaml
name: PostHog
slug: posthog
description: PostHog's API provides product analytics, feature flags, session recording, A/B testing, and user management. Open-source and self-hostable, with cloud and on-premise options.
categories:
  - Analytics
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://posthog.com/docs
  - name: API Reference
    url: https://posthog.com/docs/api
```

**Step 3: Create `collection/grafana.yaml`**

```yaml
name: Grafana
slug: grafana
description: Grafana's HTTP API enables management of dashboards, datasources, alerts, users, and organizations programmatically. Integrate with CI/CD pipelines and automate observability workflows.
categories:
  - Analytics
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://grafana.com/docs/grafana/latest/developers/http_api
  - name: API Reference
    url: https://grafana.com/docs/grafana/latest/developers/http_api
```

**Step 4: Commit**

```bash
git add collection/sentry.yaml collection/posthog.yaml collection/grafana.yaml
git commit -m "feat: add Sentry, PostHog, and Grafana API entries"
```

---

### Task 13: Dev Tools — Linear, Notion, Airtable, Figma

**Files:**
- Create: `collection/linear.yaml`
- Create: `collection/notion.yaml`
- Create: `collection/airtable.yaml`
- Create: `collection/figma.yaml`

**Step 1: Create `collection/linear.yaml`**

```yaml
name: Linear
slug: linear
description: Linear's API enables programmatic access to issues, projects, cycles, teams, and workflows. Build integrations, automate issue tracking, and sync with external tools using GraphQL.
categories:
  - Project Management
  - Development
type: GraphQL
is_free: true
links:
  - name: Docs / Website
    url: https://developers.linear.app/docs
  - name: API Reference
    url: https://developers.linear.app/docs/graphql/working-with-the-graphql-api
```

**Step 2: Create `collection/notion.yaml`**

```yaml
name: Notion API
slug: notion
description: Notion's API provides access to pages, databases, blocks, users, and comments in Notion workspaces. Read and write structured data from Notion databases programmatically.
categories:
  - Documents & Productivity
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://developers.notion.com
  - name: API Reference
    url: https://developers.notion.com/reference/intro
```

**Step 3: Create `collection/airtable.yaml`**

```yaml
name: Airtable
slug: airtable
description: Airtable's API allows reading and writing records, managing tables, and handling attachments in Airtable bases. Use it to build automations and integrations with the flexible spreadsheet-database.
categories:
  - Documents & Productivity
  - Databases
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://airtable.com/developers/web/api/introduction
  - name: API Reference
    url: https://airtable.com/developers/web/api/field-model
```

**Step 4: Create `collection/figma.yaml`**

```yaml
name: Figma
slug: figma
description: Figma's API provides access to files, components, styles, comments, and team projects. Extract design tokens, automate design-to-code workflows, and build design system tooling.
categories:
  - Art & Design
  - Development
type: REST
is_free: true
links:
  - name: Docs / Website
    url: https://www.figma.com/developers/api
  - name: API Reference
    url: https://www.figma.com/developers/api#intro
```

**Step 5: Commit**

```bash
git add collection/linear.yaml collection/notion.yaml collection/airtable.yaml collection/figma.yaml
git commit -m "feat: add Linear, Notion, Airtable, and Figma API entries"
```

---

## Final Verification

After all tasks, validate the YAML files parse correctly:

```bash
cd /Users/yevhen/Code/github.com/tools-collection/apis-collection
npx ts-node -e "
import { readdirSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import { apiSchema } from './src/schema';
const dir = './collection';
const newFiles = ['openai','anthropic','google-gemini','mistral-ai','groq','hugging-face','cohere','together-ai','replicate','stability-ai','perplexity-ai','elevenlabs','deepl','assemblyai','deepgram','fal-ai','fireworks-ai','aws-bedrock','vercel','supabase','railway','render','neon','planetscale','upstash','resend','clerk','liveblocks','convex','turso','fly-io','cloudflare-workers','deno-deploy','sentry','posthog','grafana','linear','notion','airtable','figma'];
newFiles.forEach(slug => {
  const file = readFileSync(dir + '/' + slug + '.yaml', 'utf8');
  const data = parse(file);
  const result = apiSchema.safeParse(data);
  if (!result.success) console.error(slug, result.error.errors);
  else console.log('✓', slug);
});
"
```

Expected: all 40 entries print `✓` with their slug.

Count new files to confirm all 40 were created:

```bash
ls /Users/yevhen/Code/github.com/tools-collection/apis-collection/collection/ | wc -l
```

Expected: previous count + 40.
