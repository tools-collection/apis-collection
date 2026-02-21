import fs from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";
import { stringify } from "yaml";
import { readAllApis, getProjectRoot } from "../utils.js";
import { loadCategories, sortCategories, categoryIcon } from "../categories.js";
import type { Api } from "../schema.js";

export async function build(): Promise<void> {
  const root = getProjectRoot();
  const apis = readAllApis(root);
  const categories = loadCategories(root);

  Handlebars.registerHelper("short", (s: string | undefined) => {
    if (!s || s.length <= 50) return s;
    const cleaned = s.replace(/\n/g, ". ");
    return (cleaned.split(/[.!?]/)[0] || cleaned).trim();
  });

  Handlebars.registerHelper("slug", (s: string) => {
    return s.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-").toLowerCase();
  });

  Handlebars.registerHelper("category_icon", (s: string) => categoryIcon(categories, s));

  const byCategory: Record<string, Api[]> = {};
  const graveyard: Api[] = [];
  const categoryNames: string[] = [];

  for (const api of apis) {
    if (api.is_active === false) {
      graveyard.push(api);
      continue;
    }
    for (const cat of [...api.categories].sort(sortCategories)) {
      byCategory[cat] ??= [];
      byCategory[cat].push(api);
      if (!categoryNames.includes(cat)) categoryNames.push(cat);
    }
  }

  const readmeTemplate = Handlebars.compile(
    fs.readFileSync(path.join(root, "templates", "README.handlebars"), "utf-8"),
  );
  fs.writeFileSync(
    path.join(root, "README.md"),
    readmeTemplate({
      categoriesNames: categoryNames.sort(sortCategories),
      apis: byCategory,
      Graveyard: graveyard,
    }),
  );

  const distDir = path.join(root, "dist");
  fs.mkdirSync(distDir, { recursive: true });
  const activeApis = apis.filter((a) => a.is_active !== false);
  fs.writeFileSync(path.join(distDir, "apis-list.yaml"), stringify(activeApis));
  fs.writeFileSync(path.join(distDir, "api-graveyard.yaml"), stringify(graveyard));

  console.log(`Built: ${activeApis.length} active, ${graveyard.length} graveyard, ${categoryNames.length} categories`);
}
