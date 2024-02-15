import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import defaultStyle from "../defaultStyle";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import MapNavigation from "./stack.map.routes";
import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import Profile from "../screens/Profile";

import NewFecing from "../screens/NewFecing";
import ButtonNewfecing from "../components/ButtonNewfecing";
import KiddoDetailButton from "../components/KiddoDetailButton";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  return (
    <Navigator
      initialRouteName="Mapa"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          backgroundColor: defaultStyle.colors.light,
        },
        headerStyle: {
          backgroundColor: defaultStyle.colors.mainColorBlue,
          elevation: 25,
          height: 75,
        },
        tabBarActiveTintColor: defaultStyle.colors.mainColorBlue,
        tabBarInactiveTintColor: defaultStyle.colors.grayAccent4,
      }}
    >
      <Screen
        name="Mapa"
        component={MapNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="location" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Mapa" />,
          headerRight: () => <KiddoDetailButton />,
          tabBarLabel: "Mapa",
        }}
      />
      <Screen
        name="locationHistory"
        component={LocationHistoryScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Histórico de Localização" />,
          tabBarLabel: "Histórico",
        }}
      />
      <Screen
        name="Cerca"
        component={NewFecing}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonNewfecing size={size} color={color} focused={focused} />
          ),
          headerTitle: () => <Header name="Geo Cerca" />,
          tabBarLabel: "",
        }}
      />
      <Screen
        name="Alertas"
        component={AlertScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="notification" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Alertas" />,
          tabBarBadge: 3,
        }}
      />
      <Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Perfil" />,
        }}
      />
    </Navigator>
  );
}
