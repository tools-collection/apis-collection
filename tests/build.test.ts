import { describe, it, expect } from "vitest";
import { readAllApis } from "../src/utils.js";
import { getProjectRoot } from "../src/utils.js";

describe("build", () => {
  it("readAllApis returns non-empty array from collection", () => {
    const root = getProjectRoot();
    const apis = readAllApis(root);
    expect(Array.isArray(apis)).toBe(true);
    expect(apis.length).toBeGreaterThan(0);
    expect(apis[0]).toHaveProperty("name");
    expect(apis[0]).toHaveProperty("slug");
    expect(apis[0]).toHaveProperty("categories");
  });
});
