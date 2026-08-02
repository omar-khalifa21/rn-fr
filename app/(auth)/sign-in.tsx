import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View>
        <Text>
            Sigin

        </Text>
        <Link href = "../(auth)/sign-in">
            <Text>
                SignIn
            </Text>
        </Link>
    </View>
  )
}
