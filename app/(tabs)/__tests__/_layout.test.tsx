import React from "react";
import { render } from "@testing-library/react-native";
import { Image, View } from "react-native";

import { tabs as tabsData } from "@/assets/constants/data";
import { colors, components } from "@/assets/constants/theme";

const insetsMock = { top: 0, right: 0, bottom: 0, left: 0 };

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => insetsMock,
}));

jest.mock("expo-router", () => {
  const TabsScreen = jest.fn(() => null);
  const Tabs = jest.fn(({ children }: any) => children);
  (Tabs as any).Screen = TabsScreen;
  return { Tabs };
});

import { Tabs } from "expo-router";
import TabLayout from "../_layout";

const TabsMock = Tabs as unknown as jest.Mock;
const TabsScreenMock = Tabs.Screen as unknown as jest.Mock;

describe("TabLayout (app/(tabs)/_layout.tsx)", () => {
  beforeEach(() => {
    TabsMock.mockClear();
    TabsScreenMock.mockClear();
    insetsMock.top = 0;
    insetsMock.right = 0;
    insetsMock.bottom = 0;
    insetsMock.left = 0;
  });

  it("registers one Tabs.Screen per configured tab, in the same order as the data source", () => {
    render(<TabLayout />);

    expect(TabsScreenMock).toHaveBeenCalledTimes(tabsData.length);
    TabsScreenMock.mock.calls.forEach(([props]: any[], index: number) => {
      expect(props.name).toBe(tabsData[index].name);
      expect(props.options.title).toBe(tabsData[index].title);
      expect(typeof props.options.tabBarIcon).toBe("function");
    });
  });

  it("hides the header and the default tab bar labels", () => {
    render(<TabLayout />);
    const screenOptions = TabsMock.mock.calls[0][0].screenOptions;
    expect(screenOptions.headerShown).toBe(false);
    expect(screenOptions.tabBarShowLabel).toBe(false);
  });

  it("uses the safe-area bottom inset for the tab bar offset when it exceeds the default horizontal inset", () => {
    insetsMock.bottom = 40; // greater than components.tabBar.horizontalInset (20)
    render(<TabLayout />);
    const screenOptions = TabsMock.mock.calls[0][0].screenOptions;
    expect(screenOptions.tabBarStyle.bottom).toBe(40);
  });

  it("falls back to the theme's horizontal inset when the safe-area bottom inset is smaller", () => {
    insetsMock.bottom = 5; // smaller than components.tabBar.horizontalInset (20)
    render(<TabLayout />);
    const screenOptions = TabsMock.mock.calls[0][0].screenOptions;
    expect(screenOptions.tabBarStyle.bottom).toBe(components.tabBar.horizontalInset);
  });

  it("falls back to the theme's horizontal inset when the safe-area bottom inset is exactly equal", () => {
    insetsMock.bottom = components.tabBar.horizontalInset;
    render(<TabLayout />);
    const screenOptions = TabsMock.mock.calls[0][0].screenOptions;
    expect(screenOptions.tabBarStyle.bottom).toBe(components.tabBar.horizontalInset);
  });

  it("derives the remaining tab bar styling from the theme constants", () => {
    render(<TabLayout />);
    const screenOptions = TabsMock.mock.calls[0][0].screenOptions;

    expect(screenOptions.tabBarStyle.position).toBe("absolute");
    expect(screenOptions.tabBarStyle.height).toBe(components.tabBar.height);
    expect(screenOptions.tabBarStyle.marginHorizontal).toBe(
      components.tabBar.horizontalInset
    );
    expect(screenOptions.tabBarStyle.borderRadius).toBe(components.tabBar.radius);
    expect(screenOptions.tabBarStyle.backgroundColor).toBe(colors.primary);
    expect(screenOptions.tabBarStyle.borderTopWidth).toBe(0);
    expect(screenOptions.tabBarStyle.elevation).toBe(0);

    expect(screenOptions.tabBarItemStyle.paddingVertical).toBe(
      components.tabBar.height / 2 - components.tabBar.iconFrame / 1.6
    );

    expect(screenOptions.tabBarIconStyle.width).toBe(components.tabBar.iconFrame);
    expect(screenOptions.tabBarIconStyle.height).toBe(components.tabBar.iconFrame);
  });

  it("renders the tab icon with the base pill style when unfocused", () => {
    render(<TabLayout />);
    const { options } = TabsScreenMock.mock.calls[0][0];

    const { UNSAFE_getAllByType } = render(
      options.tabBarIcon({ focused: false, color: "", size: 0 })
    );
    const pill = UNSAFE_getAllByType(View).find(
      (node: any) =>
        typeof node.props.className === "string" &&
        node.props.className.includes("tabs-pill")
    );

    expect(pill).toBeTruthy();
    expect(pill!.props.className).toBe("tabs-pill");
  });

  it("adds the active pill style only when the tab is focused", () => {
    render(<TabLayout />);
    const { options } = TabsScreenMock.mock.calls[0][0];

    const { UNSAFE_getAllByType } = render(
      options.tabBarIcon({ focused: true, color: "", size: 0 })
    );
    const pill = UNSAFE_getAllByType(View).find(
      (node: any) =>
        typeof node.props.className === "string" &&
        node.props.className.includes("tabs-pill")
    );

    expect(pill).toBeTruthy();
    expect(pill!.props.className).toBe("tabs-pill tabs-active");
  });

  it("passes each tab's configured icon source through to the rendered Image", () => {
    render(<TabLayout />);

    TabsScreenMock.mock.calls.forEach(([props]: any[], index: number) => {
      const { UNSAFE_getByType } = render(
        props.options.tabBarIcon({ focused: false, color: "", size: 0 })
      );
      const image = UNSAFE_getByType(Image);
      expect(image.props.source).toBe(tabsData[index].icon);
    });
  });
});