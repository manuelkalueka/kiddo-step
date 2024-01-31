import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import defaultStyle from "./src/defaultStyle";

import SignupNavigation from "./src/routes/stack.signup.routes";
import TabRoutes from "./src/routes/tab.routes";

const isAuthenticated = true;
const userName = "kaluekaa";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {isAuthenticated && userName === "kalueka" ? (
            <TabRoutes />
          ) : (
            <SignupNavigation />
          )}
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
