import { describe, it, expect } from "vitest";
import { makeSlug, compact } from "../src/utils.js";

describe("makeSlug", () => {
  it("lowercases and slugifies", () => expect(makeSlug("YouTube API")).toBe("youtube-api"));
  it("strips special chars", () => expect(makeSlug("1Forge.com")).toBe("1forgecom"));
});

describe("compact", () => {
  it("removes empty strings", () => expect(compact({ a: "x", b: "" })).toEqual({ a: "x" }));
  it("removes undefined", () => expect(compact({ a: 1, b: undefined })).toEqual({ a: 1 }));
  it("removes empty arrays", () => expect(compact({ a: [] })).toEqual({}));
});
