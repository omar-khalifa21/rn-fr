import { Link } from "expo-router";
import { Text, View } from "react-native";

 
export default function App() {
  return (
    <View>
        <Text>
            Signup

        </Text>
        <Link href = "../(auth)/sign-up">
            <Text>
                SignIn
            </Text>
        </Link>
    </View>
  )
}
