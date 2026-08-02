import React from "react";
import { View, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

const SubscriptionDetails = () => {
  const {id} = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Subscription Details</Text>
      <Link href = "/">Go back niglet</Link>

    </View>
  )
}

export default SubscriptionDetails