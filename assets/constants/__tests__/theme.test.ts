import { colors, spacing, components, theme } from "@/assets/constants/theme";

describe("theme constants", () => {
  describe("colors", () => {
    it("defines all expected color tokens with their exact values", () => {
      expect(colors).toEqual({
        background: "#fff9e3",
        foreground: "#081126",
        card: "#fff8e7",
        muted: "#f6eecf",
        mutedForeground: "rgba(0, 0, 0, 0.6)",
        primary: "#081126",
        accent: "#ea7a53",
        border: "rgba(0, 0, 0, 0.1)",
        success: "#16a34a",
        destructive: "#dc2626",
        subscription: "#8fd1bd",
      });
    });

    it("does not include any unexpected color keys", () => {
      expect(Object.keys(colors).sort()).toEqual(
        [
          "background",
          "foreground",
          "card",
          "muted",
          "mutedForeground",
          "primary",
          "accent",
          "border",
          "success",
          "destructive",
          "subscription",
        ].sort()
      );
    });
  });

  describe("spacing", () => {
    it("maps the small keys (0-12) to 4px increments", () => {
      for (let i = 0; i <= 12; i++) {
        expect(spacing[i as keyof typeof spacing]).toBe(i * 4);
      }
    });

    it("defines the larger, non-linear spacing scale used for layout", () => {
      expect(spacing[14]).toBe(56);
      expect(spacing[16]).toBe(64);
      expect(spacing[18]).toBe(72);
      expect(spacing[20]).toBe(80);
      expect(spacing[24]).toBe(96);
      expect(spacing[30]).toBe(120);
    });

    it("has a spacing value of exactly 0 for the base key", () => {
      expect(spacing[0]).toBe(0);
    });
  });

  describe("components.tabBar", () => {
    it("derives every tab bar metric from the spacing scale", () => {
      expect(components.tabBar.height).toBe(spacing[18]);
      expect(components.tabBar.horizontalInset).toBe(spacing[5]);
      expect(components.tabBar.radius).toBe(spacing[8]);
      expect(components.tabBar.iconFrame).toBe(spacing[12]);
      expect(components.tabBar.itemPaddingVertical).toBe(spacing[2]);
    });

    it("resolves to the concrete pixel values consumed by the tab layout", () => {
      expect(components.tabBar).toEqual({
        height: 72,
        horizontalInset: 20,
        radius: 32,
        iconFrame: 48,
        itemPaddingVertical: 8,
      });
    });
  });

  describe("theme", () => {
    it("aggregates colors, spacing and components under a single object", () => {
      expect(theme).toEqual({ colors, spacing, components });
    });

    it("re-exports the same object references (not copies)", () => {
      expect(theme.colors).toBe(colors);
      expect(theme.spacing).toBe(spacing);
      expect(theme.components).toBe(components);
    });
  });
});