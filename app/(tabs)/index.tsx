import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView  as RNSafeAreaView} from "react-native-safe-area-context";
 const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  return (
    <SafeAreaView className="flex-1  bg-background p-5">
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
      <Link href ="/(tabs)/subscriptions/sportify" className="mt-4 rounded bg-primary text-white px-4 py-2 font-bold"> Sporify subscruption</Link>
      <Link href =
      {{
        pathname: "/(tabs)/subscriptions/[id] " ,
        params: { id: "claude" }, 
      }}
      
      
      
      >  claude Subscription details</Link>
    </SafeAreaView>
  );
}
