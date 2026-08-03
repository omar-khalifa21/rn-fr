import React from "react";
import { render, screen } from "@testing-library/react-native";

jest.mock("nativewind", () => ({
  styled: (Component: any) => Component,
}));

jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return { SafeAreaView: View };
});

jest.mock("expo-router", () => ({
  Link: ({ children }: any) => children,
}));

import SettingsScreen from "../settings";

describe("Settings screen (app/(tabs)/settings.tsx)", () => {
  it("renders the Settings heading", () => {
    render(<SettingsScreen />);
    expect(screen.getByText("Settings")).toBeTruthy();
  });

  it("does not render unrelated screen content", () => {
    render(<SettingsScreen />);
    expect(screen.queryByText("Insights")).toBeNull();
    expect(screen.queryByText("settings")).toBeNull();
  });
});