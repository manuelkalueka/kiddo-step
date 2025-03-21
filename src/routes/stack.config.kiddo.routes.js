import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigKiddoScreen from "../screens/ConfigKiddoScreen";
import defaultStyle from "../defaultStyle";
import Header from "../components/Header";
import { Text } from "react-native";
const { Screen, Navigator } = createNativeStackNavigator();
const KiddoRouter = () => {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: defaultStyle.colors.mainColorBlue,
          elevation: 25,
          height: 75,
        },
        headerTitleAlign: "left",
      }}
    >
      <Screen
        name="KiddoConfig"
        component={ConfigKiddoScreen}
        options={{
          headerTitle: () => <Header name="Configurar Conta" />,
        }}
      />
    </Navigator>
  );
};

export default KiddoRouter;
