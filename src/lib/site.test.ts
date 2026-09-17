import { describe, expect, it } from "vitest";
import { homeUrl, site } from "./site";

describe("homeUrl", () => {
  it("is the site origin with a trailing slash", () => {
    expect(homeUrl).toBe("https://pinitgrow.com/");
    expect(homeUrl).toBe(`${site.url}/`);
  });
});
