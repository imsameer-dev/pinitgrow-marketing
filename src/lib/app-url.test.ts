import { afterEach, describe, expect, it } from "vitest";
import { appUrl } from "./app-url";

const original = process.env.NEXT_PUBLIC_APP_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_APP_URL = original;
});

describe("appUrl", () => {
  it("joins origin and path without a double slash", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pinitgrow.com/";
    expect(appUrl("/register")).toBe("https://app.pinitgrow.com/register");
    expect(appUrl("login")).toBe("https://app.pinitgrow.com/login");
  });

  it("throws when NEXT_PUBLIC_APP_URL is missing", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    expect(() => appUrl("/register")).toThrow(/NEXT_PUBLIC_APP_URL/);
  });
});
