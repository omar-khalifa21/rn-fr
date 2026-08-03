import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView  as RNSafeAreaView} from "react-native-safe-area-context";
 const SafeAreaView = styled(RNSafeAreaView);
 
export default function App() {
  return (
    <SafeAreaView className="flex-1  bg-background p-5">
      <Text className="text-xl font-bold text-success">
        Insights
      </Text>
    </SafeAreaView>
  )
}
