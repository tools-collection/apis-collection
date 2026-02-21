import fs from "node:fs";
import path from "node:path";
import { readAllApis, getProjectRoot } from "../utils.js";

export async function checkOrphans(): Promise<void> {
  const root = getProjectRoot();
  const apis = readAllApis(root);
  const slugs = new Set(apis.map((a) => a.slug));
  const apisDir = path.join(root, "apis");

  if (!fs.existsSync(apisDir)) return;

  const dirs = fs.readdirSync(apisDir).filter((d) => !d.startsWith("."));
  let removed = 0;

  for (const dir of dirs) {
    if (slugs.has(dir)) continue;
    const fullPath = path.join(apisDir, dir);
    const files = fs.readdirSync(fullPath);
    const onlyMd = files.every((f) => f.endsWith(".md"));

    if (onlyMd) {
      fs.rmSync(fullPath, { recursive: true });
      console.log(`Removed orphan: ${dir}`);
      removed++;
    } else {
      console.warn(`Skipped orphan (non-md files): ${dir}`);
    }
  }

  console.log(`Removed ${removed} orphan directories`);
}
