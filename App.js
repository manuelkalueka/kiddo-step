import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import defaultStyle from "./src/defaultStyle";

import Login from "./src/components/pages/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Login />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingTop: Platform.OS == "android" ? 40 : 0,
  },
});
