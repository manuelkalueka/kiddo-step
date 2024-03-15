import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyle from "./src/defaultStyle";

import SignupNavigation from "./src/routes/stack.signup.routes";
import TabRoutes from "./src/routes/tab.routes";

const isAuthenticated = true;
const userName = "kalueka";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={defaultStyle.colors.mainColorBlue}
        barStyle={"default"}
      />
      <NavigationContainer>
        {isAuthenticated && userName === "kalueka" ? (
          <TabRoutes />
        ) : (
          <SignupNavigation />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
  },
});
