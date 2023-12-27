import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import defaultStyle from "./src/defaultStyle";

import Login from "./src/components/pages/Login";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Login />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingTop: Platform.OS == "android" ? 40 : 0,
  },
});
