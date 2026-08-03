import React from "react";
import { render, screen } from "@testing-library/react-native";

jest.mock("expo-router", () => {
  const { Text } = require("react-native");
  const React = require("react");
  const Link = jest.fn(({ children, href, ...rest }: any) => (
    <Text {...rest}>{children}</Text>
  ));
  return { Link };
});

import { Link } from "expo-router";
import SubscriptionsScreen from "../subscriptions";

const LinkMock = Link as unknown as jest.Mock;

describe("Subscriptions tab screen (app/(tabs)/subscriptions.tsx)", () => {
  beforeEach(() => {
    LinkMock.mockClear();
  });

  it("renders the Signup text", () => {
    render(<SubscriptionsScreen />);
    expect(screen.getByText(/Signup/)).toBeTruthy();
  });

  it("renders a SignIn link pointing at the sign-up auth route", () => {
    render(<SubscriptionsScreen />);
    expect(screen.getByText(/SignIn/)).toBeTruthy();

    const call = LinkMock.mock.calls.find(
      ([props]: any[]) => props.href === "../(auth)/sign-up"
    );
    expect(call).toBeTruthy();
  });
});