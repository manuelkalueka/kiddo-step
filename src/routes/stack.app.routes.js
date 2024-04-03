import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

//Telas
import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import ProfileStack from "./stack.profile.routes";
import NewFecing from "../screens/NewFecing";
import Map from "../screens/Map";
import KiddoDetailsScreen from "./../screens/KiddoDetailsScreen";
//-----------------------------------------------------

export function MapStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Mapa" component={Map} />
      <Screen
        name="KiddoDetails"
        component={KiddoDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </Navigator>
  );
}

export function LocationHistoryStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="LocationHistory" component={LocationHistoryScreen} />
    </Navigator>
  );
}

export function FencigStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Cerca" component={NewFecing} />
    </Navigator>
  );
}

export function ProfileAllStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Perfil" component={ProfileStack} />
    </Navigator>
  );
}

export function AlertStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Alertas" component={AlertScreen} />
    </Navigator>
  );
}
