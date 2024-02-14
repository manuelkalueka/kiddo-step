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
import KiddoDetailsScreen from "../screens/KiddoDetailsScreen";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  return (
    <Navigator
      initialRouteName="Mapa"
      screenOptions={{
        tabBarStyle: {
          // position: "absolute",
          // bottom: 30,
          height: 50,
          // borderRadius: 10,
          backgroundColor: defaultStyle.colors.light,
          borderTopColor: "transparent",
          // shadowColor: defaultStyle.colors.black,
          // shadowOpacity: 0.2,
          // shadowOffset: {
          //   width: 2,
          //   height: 2,
          // },
        },
        headerStyle: {
          backgroundColor: defaultStyle.colors.mainColorBlue,
        },
        headerTitleStyle: {
          color: defaultStyle.colors.white,
          fontSize: 35,
          fontWeight: "bold",
        },
        // tabBarShowLabel: false,
        tabBarActiveTintColor: defaultStyle.colors.mainColorBlue,
        tabBarInactiveTintColor: defaultStyle.colors.grayAccent4,
      }}
    >
      <Screen
        name="KiddoDetails"
        component={KiddoDetailsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="location" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="locationHistory"
        component={LocationHistoryScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
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
        }}
      />
    </Navigator>
  );
}
