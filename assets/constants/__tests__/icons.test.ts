import { icons } from "@/assets/constants/icons";

describe("icons", () => {
  const expectedKeys = [
    "home",
    "wallet",
    "setting",
    "activity",
    "add",
    "back",
    "menu",
    "plus",
    "notion",
    "dropbox",
    "openai",
    "adobe",
    "medium",
    "figma",
    "spotify",
    "github",
    "claude",
    "canva",
  ] as const;

  it("exposes exactly the expected set of icon keys", () => {
    expect(Object.keys(icons).sort()).toEqual([...expectedKeys].sort());
  });

  it("resolves every icon to a defined, truthy asset reference", () => {
    expectedKeys.forEach((key) => {
      expect(icons[key]).toBeDefined();
      expect(icons[key]).toBeTruthy();
    });
  });

  it("does not include a key for an icon that was not registered (e.g. netflix)", () => {
    expect(Object.prototype.hasOwnProperty.call(icons, "netflix")).toBe(false);
  });

  it("returns the same object reference across repeated imports (module caching)", () => {
    const { icons: iconsAgain } = require("@/assets/constants/icons");
    expect(iconsAgain).toBe(icons);
  });

  it("gives every icon a distinct asset value", () => {
    const values = expectedKeys.map((key) => icons[key]);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });
});