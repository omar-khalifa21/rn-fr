import React from "react";
import { render, screen } from "@testing-library/react-native";

jest.mock("nativewind", () => ({
  styled: (Component: any) => Component,
}));

jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return { SafeAreaView: View };
});

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const Link = jest.fn(({ children, href, ...rest }: any) => (
    <Text {...rest}>{children}</Text>
  ));
  return { Link };
});

import { Link } from "expo-router";
import HomeScreen from "../index";

const LinkMock = Link as unknown as jest.Mock;

describe("Home screen (app/(tabs)/index.tsx)", () => {
  beforeEach(() => {
    LinkMock.mockClear();
  });

  it("renders the welcome heading", () => {
    render(<HomeScreen />);
    expect(screen.getByText("Welcome to Nativewind!")).toBeTruthy();
  });

  it("renders navigation links for onboarding and both auth flows with the correct destinations", () => {
    render(<HomeScreen />);

    expect(screen.getByText("Get Started")).toBeTruthy();
    expect(screen.getByText("Sign In")).toBeTruthy();
    expect(screen.getByText("Sign Up")).toBeTruthy();

    const hrefs = LinkMock.mock.calls.map(([props]: any[]) => props.href);
    expect(hrefs).toContain("../onboarding");
    expect(hrefs).toContain("../(auth)/sign-in");
    expect(hrefs).toContain("../(auth)/sign-up");
  });

  it("links the sportify entry to the static subscriptions route", () => {
    render(<HomeScreen />);

    expect(screen.getByText(/Sporify subscruption/i)).toBeTruthy();

    const sportifyCall = LinkMock.mock.calls.find(
      ([props]: any[]) => props.href === "/(tabs)/subscriptions/sportify"
    );
    expect(sportifyCall).toBeTruthy();
  });

  it("links the claude entry to the dynamic subscription details route with the claude id param", () => {
    render(<HomeScreen />);

    expect(screen.getByText(/claude Subscription details/i)).toBeTruthy();

    const claudeCall = LinkMock.mock.calls.find(
      ([props]: any[]) =>
        props.href && typeof props.href === "object" && props.href.params?.id === "claude"
    );
    expect(claudeCall).toBeTruthy();

    // Regression guard: documents the current pathname value (including its
    // trailing-space typo) so any accidental further changes are caught.
    expect(claudeCall![0].href).toEqual({
      pathname: "/(tabs)/subscriptions/[id] ",
      params: { id: "claude" },
    });
  });

  it("renders exactly five links in total", () => {
    render(<HomeScreen />);
    expect(LinkMock).toHaveBeenCalledTimes(5);
  });
});