import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import defaultStyle from "../defaultStyle";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import Map from "../screens/Map";
import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import Profile from "../screens/Profile";

import NewFecing from "../screens/NewFecing";
import ButtonNewfecing from "../components/ButtonNewfecing";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  return (
    <Navigator
      initialRouteName="Mapa"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          height: 50,
          marginHorizontal: 20,
          borderRadius: 10,
          backgroundColor: defaultStyle.colors.light,
          borderTopColor: "transparent",
          shadowColor: defaultStyle.colors.black,
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: defaultStyle.colors.mainColorBue,
        tabBarInactiveTintColor: defaultStyle.colors.grayAccent4,
      }}
    >
      <Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="location" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Alertas"
        component={AlertScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="notification" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cerca"
        component={NewFecing}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonNewfecing size={size} color={color} focused={focused} />
          ),
          tabBarLabel: "Kalueka",
        }}
      />
      <Screen
        name="locationHistory"
        component={LocationHistoryScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="compass" size={size} color={color} />
          ),
          tabBarLabel: "Histórico",
        }}
      />
      <Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
