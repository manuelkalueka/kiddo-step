import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import defaultStyle from "./src/defaultStyle";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={defaultStyle.colors.blueDarkColor4}
          barStyle="light-content"
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
