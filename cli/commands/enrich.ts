import fs from "node:fs";
import path from "node:path";
import { Octokit } from "octokit";
import { collectionDir, readYamlFile, writeYamlFile, getProjectRoot } from "../utils.js";
import type { Api, Library } from "../schema.js";

async function getGitHubInfo(octokit: Octokit, owner: string, repo: string) {
  const { data } = await octokit.rest.repos.get({ owner, repo });
  return { owner: data.owner, stargazers_count: data.stargazers_count };
}

function parseGitHubUrl(urlStr: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(urlStr);
    if (u.host !== "github.com" && u.host !== "www.github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

async function enrichLib(octokit: Octokit, lib: Library): Promise<Library> {
  const url = lib.source_code_url || lib.documentation_url;
  if (!url) return lib;
  const gh = parseGitHubUrl(url);
  if (!gh) return lib;

  try {
    const info = await getGitHubInfo(octokit, gh.owner, gh.repo);
    if (info.owner.type === "User") lib.author = info.owner.login;
    lib.stargazers_count = info.stargazers_count;
  } catch (e) {
    console.error((e as Error).message);
  }
  return lib;
}

export async function enrich(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) console.warn("GITHUB_TOKEN not set, rate limits will apply");

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const root = getProjectRoot();
  const dir = collectionDir(root);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yaml"));

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const api = readYamlFile<Api>(filePath);
    if (!api.libraries?.length) continue;

    console.log(`[${i + 1}/${files.length}] ${api.name}`);
    let changed = false;

    for (let k = 0; k < api.libraries.length; k++) {
      const before = JSON.stringify(api.libraries[k]);
      api.libraries[k] = await enrichLib(octokit, api.libraries[k]);
      if (JSON.stringify(api.libraries[k]) !== before) changed = true;
    }

    if (changed) writeYamlFile(filePath, api);
  }
}
