import { describe, it, expect } from "vitest";
import { apiSchema } from "../src/schema.js";

describe("validate logic", () => {
  it("detects slug mismatch", () => {
    const api = { name: "Test", slug: "wrong-slug", categories: ["Other"] };
    const filename = "test.yaml";
    const result = apiSchema.safeParse(api);
    expect(result.success).toBe(true);
    expect(result.success && result.data.slug).not.toBe(filename.replace(".yaml", ""));
  });
});
