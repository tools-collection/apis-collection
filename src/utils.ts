import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import slugify from "slugify";
import type { Api } from "./schema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COLLECTION_DIR = "collection";
const GRAVEYARD_DIR = "graveyard";
const CATEGORIES_FILE = "categories.yaml";

export function getProjectRoot(): string {
  let dir = path.resolve(__dirname, "..");
  while (!fs.existsSync(path.join(dir, CATEGORIES_FILE))) {
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error("Could not find project root");
    dir = parent;
  }
  return dir;
}

export function collectionDir(root?: string): string {
  return path.join(root ?? getProjectRoot(), COLLECTION_DIR);
}

export function graveyardDir(root?: string): string {
  return path.join(root ?? getProjectRoot(), GRAVEYARD_DIR);
}

export function readYamlFile<T>(filePath: string): T {
  return YAML.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeYamlFile(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, YAML.stringify(data, { lineWidth: 120 }));
}

function readApisFromDir(dir: string): Api[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith(".yaml"))
    .map((f: string) => readYamlFile<Api>(path.join(dir, f)));
}

export function readAllApis(root?: string): Api[] {
  const base = root ?? getProjectRoot();
  const collection = readApisFromDir(collectionDir(base));
  const graveyard = readApisFromDir(graveyardDir(base));
  return [...collection, ...graveyard].sort((a, b) => a.name.localeCompare(b.name));
}

export function makeSlug(name: string): string {
  return slugify(name, { lower: true, strict: true });
}

export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    result[key] =
      typeof value === "object" && value !== null && !Array.isArray(value)
        ? compact(value as Record<string, unknown>)
        : value;
  }
  return result as Partial<T>;
}
