import fs from "node:fs";
import path from "node:path";
import { collectionDir, graveyardDir, readYamlFile, getProjectRoot } from "../utils.js";
import { apiSchema } from "../schema.js";
import { loadCategories } from "../categories.js";

function validateDir(dir: string, validCategories: Set<string>, label: string): number {
  if (!fs.existsSync(dir)) return 0;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yaml"));
  let errors = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = readYamlFile<unknown>(filePath);
    const result = apiSchema.safeParse(raw);
    if (!result.success) {
      console.error(`INVALID ${label}/${file}:`);
      for (const issue of result.error.issues) {
        console.error(`  ${issue.path.join(".")}: ${issue.message}`);
      }
      errors++;
      continue;
    }
    for (const cat of result.data.categories) {
      if (!validCategories.has(cat)) {
        console.error(`UNKNOWN CATEGORY in ${label}/${file}: "${cat}"`);
        errors++;
      }
    }
    const expectedFilename = `${result.data.slug}.yaml`;
    if (file !== expectedFilename) {
      console.error(`SLUG MISMATCH: ${label}/${file} but slug is "${result.data.slug}"`);
      errors++;
    }
  }
  return errors;
}

export async function validate(): Promise<void> {
  const root = getProjectRoot();
  const categories = loadCategories(root);
  const validCategories = new Set(Object.keys(categories));
  let errors = validateDir(collectionDir(root), validCategories, "collection");
  errors += validateDir(graveyardDir(root), validCategories, "graveyard");
  const collFiles = fs.existsSync(collectionDir(root))
    ? fs.readdirSync(collectionDir(root)).filter((f) => f.endsWith(".yaml")).length
    : 0;
  const gravFiles = fs.existsSync(graveyardDir(root))
    ? fs.readdirSync(graveyardDir(root)).filter((f) => f.endsWith(".yaml")).length
    : 0;
  console.log(`Validated ${collFiles} collection + ${gravFiles} graveyard files, ${errors} errors`);
  if (errors > 0) process.exit(1);
}
