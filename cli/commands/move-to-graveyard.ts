import fs from "node:fs";
import path from "node:path";
import { getProjectRoot, collectionDir, graveyardDir, readYamlFile } from "../utils.js";
import { apiSchema } from "../schema.js";

export async function moveToGraveyard(): Promise<void> {
  const root = getProjectRoot();
  const collDir = collectionDir(root);
  const gravDir = graveyardDir(root);
  fs.mkdirSync(gravDir, { recursive: true });

  const files = fs.readdirSync(collDir).filter((f) => f.endsWith(".yaml"));
  const moved: string[] = [];

  for (const file of files) {
    const filePath = path.join(collDir, file);
    const raw = readYamlFile<unknown>(filePath);
    const result = apiSchema.safeParse(raw);
    if (!result.success) {
      console.warn(`Skip ${file}: invalid schema`);
      continue;
    }
    if (result.data.is_active === false) {
      const dest = path.join(gravDir, file);
      fs.renameSync(filePath, dest);
      moved.push(file);
    }
  }

  console.log(`Moved ${moved.length} API(s) to graveyard: ${moved.join(", ") || "(none)"}`);
}
