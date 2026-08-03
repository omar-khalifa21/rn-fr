import React from "react";
import { render, screen } from "@testing-library/react-native";

const mockUseLocalSearchParams = jest.fn();

jest.mock("expo-router", () => {
  const { Text } = require("react-native");
  const React = require("react");
  const Link = jest.fn(({ children, href, ...rest }: any) => (
    <Text {...rest}>{children}</Text>
  ));
  return {
    Link,
    useLocalSearchParams: () => mockUseLocalSearchParams(),
  };
});

import { Link } from "expo-router";
import SubscriptionDetails from "../[id]";

const LinkMock = Link as unknown as jest.Mock;

describe("Subscription details screen (app/subscriptions/[id].tsx)", () => {
  beforeEach(() => {
    LinkMock.mockClear();
    mockUseLocalSearchParams.mockReset();
  });

  it("renders the Subscription Details heading regardless of the route param", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "claude" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("Subscription Details")).toBeTruthy();
  });

  it("renders a back link to the root route", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "claude" });
    render(<SubscriptionDetails />);

    expect(screen.getByText(/Go back/i)).toBeTruthy();
    const call = LinkMock.mock.calls.find(([props]: any[]) => props.href === "/");
    expect(call).toBeTruthy();
  });

  it("renders successfully even when the id route param is missing", () => {
    mockUseLocalSearchParams.mockReturnValue({});
    expect(() => render(<SubscriptionDetails />)).not.toThrow();
    expect(screen.getByText("Subscription Details")).toBeTruthy();
  });

  it("renders the same content for a different id value (id is not currently displayed)", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "spotify" });
    render(<SubscriptionDetails />);
    expect(screen.getByText("Subscription Details")).toBeTruthy();
    expect(screen.queryByText("spotify")).toBeNull();
  });
});