import { tabs } from "@/assets/constants/data";
import { icons } from "@/assets/constants/icons";

describe("tabs", () => {
  it("contains exactly four tabs in the expected order", () => {
    expect(tabs.map((tab) => tab.name)).toEqual([
      "index",
      "subscriptions",
      "insights",
      "settings",
    ]);
  });

  it("pairs each tab name with the correct display title", () => {
    const titleByName = Object.fromEntries(
      tabs.map((tab) => [tab.name, tab.title])
    );
    expect(titleByName).toEqual({
      index: "Home",
      subscriptions: "Subscriptions",
      insights: "Insights",
      settings: "Settings",
    });
  });

  it("wires each tab to the correct icon from the icons module", () => {
    const iconByName = Object.fromEntries(
      tabs.map((tab) => [tab.name, tab.icon])
    );
    expect(iconByName.index).toBe(icons.home);
    expect(iconByName.subscriptions).toBe(icons.wallet);
    expect(iconByName.insights).toBe(icons.activity);
    expect(iconByName.settings).toBe(icons.setting);
  });

  it("does not contain duplicate tab names", () => {
    const names = tabs.map((tab) => tab.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every tab a non-empty name, title and a truthy icon", () => {
    tabs.forEach((tab) => {
      expect(tab.name.length).toBeGreaterThan(0);
      expect(tab.title.length).toBeGreaterThan(0);
      expect(tab.icon).toBeTruthy();
    });
  });

  it("has exactly four entries (matches the number of tab screens)", () => {
    expect(tabs).toHaveLength(4);
  });
});