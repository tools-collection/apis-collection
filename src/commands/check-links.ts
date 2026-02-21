import pLimit from "p-limit";
import { readAllApis } from "../utils.js";

const TIMEOUT = 10_000;
const CONCURRENCY = 10;

async function checkUrl(url: string, context: string): Promise<boolean> {
  try {
    const resp = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(TIMEOUT),
      headers: { "User-Agent": "apis-collection-link-checker/2.0" },
    });
    if (resp.status === 429) return true;
    if (!resp.ok) {
      console.error(`[${resp.status}] ${url} (${context})`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[FAIL] ${url} (${context}): ${(error as Error).message}`);
    return false;
  }
}

export async function checkLinks(): Promise<void> {
  const apis = readAllApis();
  const limit = pLimit(CONCURRENCY);
  const tasks: Promise<boolean>[] = [];

  for (const api of apis) {
    if (api.is_active === false) continue;
    for (const link of api.links ?? []) {
      if (link.url) tasks.push(limit(() => checkUrl(link.url!, `${api.name} > ${link.name}`)));
    }
    for (const lib of api.libraries ?? []) {
      if (lib.documentation_url)
        tasks.push(limit(() => checkUrl(lib.documentation_url!, `${api.name} > ${lib.name} docs`)));
      if (lib.source_code_url)
        tasks.push(limit(() => checkUrl(lib.source_code_url!, `${api.name} > ${lib.name} source`)));
    }
  }

  const results = await Promise.all(tasks);
  const failed = results.filter((r) => !r).length;
  console.log(`Checked ${results.length} URLs, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
