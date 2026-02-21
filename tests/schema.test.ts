import { describe, it, expect } from "vitest";
import { apiSchema } from "../src/schema.js";

describe("apiSchema", () => {
  it("accepts minimal valid API", () => {
    const result = apiSchema.safeParse({ name: "Test", slug: "test", categories: ["Other"] });
    expect(result.success).toBe(true);
  });

  it("accepts full API with all fields", () => {
    const result = apiSchema.safeParse({
      name: "YouTube",
      slug: "youtube",
      description: "Video API",
      categories: ["Video & Media"],
      type: "REST",
      is_free: false,
      is_active: true,
      auth_type: "oauth2",
      rate_limits: "10k/day",
      tags: ["video", "google"],
      specification: { type: "openapi", url: "https://example.com", version: "3.0" },
      links: [{ name: "Docs", url: "https://example.com" }],
      libraries: [{ name: "SDK", platform: "Node.js" }],
    });
    expect(result.success).toBe(true);
  });

  it("rejects API without name", () => {
    const result = apiSchema.safeParse({ slug: "test", categories: ["Other"] });
    expect(result.success).toBe(false);
  });

  it("rejects API with empty categories", () => {
    const result = apiSchema.safeParse({ name: "Test", slug: "test", categories: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid auth_type", () => {
    const result = apiSchema.safeParse({ name: "T", slug: "t", categories: ["Other"], auth_type: "invalid" });
    expect(result.success).toBe(false);
  });
});
