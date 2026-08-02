import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="../onboarding" className="mt-4 rounded bg-primary text-white px-4 py-2 font-bold">
        Get Started
      </Link>
      <Link href="../(auth)/sign-in" className="mt-4 rounded bg-primary text-white px-4 py-2 font-bold">
        Sign In
      </Link>
      <Link href="../(auth)/sign-up" className="mt-4 rounded bg-primary text-white px-4 py-2 font-bold">
        Sign Up
      </Link>
      <Link href ="/(tabs)/subscriptions/sportify"> Sporify subscruption</Link>
      <Link href =
      {{
        pathname: "/(tabs)/subscriptions/[id]",
        params: { id: "claude" },
      }}
      
      
      
      >  claude Subscription details</Link>
    </View>
  );
}
