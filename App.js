import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import defaultStyle from "./src/defaultStyle";
import Login from "./src/components/pages/Login";
import Signup from "./src/components/pages/Signup";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Signup"
          >
            <Stack.Screen name="Signup" component={Signup}
            options={
              {
                headerShown:false,
              }
            }
            />
              <Stack.Screen name="Login" component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
  },
});
