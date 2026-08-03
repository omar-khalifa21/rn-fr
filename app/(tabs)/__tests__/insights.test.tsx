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

import InsightsScreen from "../insights";

describe("Insights screen (app/(tabs)/insights.tsx)", () => {
  it("renders the Insights heading", () => {
    render(<InsightsScreen />);
    expect(screen.getByText("Insights")).toBeTruthy();
  });

  it("does not render unrelated screen content", () => {
    render(<InsightsScreen />);
    expect(screen.queryByText("Settings")).toBeNull();
    expect(screen.queryByText("insights")).toBeNull();
  });
});