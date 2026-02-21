import path from "node:path";
import { getProjectRoot, readYamlFile } from "./utils.js";
import type { Categories } from "./schema.js";

export function loadCategories(root?: string): Categories {
  return readYamlFile<Categories>(path.join(root ?? getProjectRoot(), "categories.yaml"));
}

export function sortCategories(a: string, b: string): number {
  if (a === "Other") return 1;
  if (b === "Other") return -1;
  return a.localeCompare(b);
}

export function categoryIcon(categories: Categories, name: string): string {
  return categories[name] || "📃";
}
