import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../context/Auth"; // contexto de autenticação

import defaultStyle from "./../defaultStyle";
// ----------- Stacks ---------------------
import AppStack from "./stack.app.routes";
import AuthRoutes from "./stack.auth.routes";
//-----------------------------------------------

export function Router() {
  const { authData, loading } = useAuth;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>App carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={defaultStyle.colors.mainColorBlue}
        barStyle={"default"}
      />
      <NavigationContainer>
        {authData ? <AppStack /> : <AuthRoutes />}
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
