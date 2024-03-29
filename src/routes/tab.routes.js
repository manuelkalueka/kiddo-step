import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import defaultStyle from "../defaultStyle";
import ButtonNewfecing from "../components/ButtonNewfecing";
import {
  AlertStack,
  MapStack,
  FencigStack,
  ProfileAllStack,
  LocationHistoryStack,
} from "../routes/stack.app.routes";

import Header from "../components/Header";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  const navigation = useNavigation();
  function handleKiddoModalOpen() {
    navigation.navigate("KiddoDetails");
  }

  return (
    <Navigator
      initialRouteName="MapaTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: defaultStyle.colors.mainColorBlue,
          elevation: 25,
          height: 75,
        },
        headerTitleAlign: "left",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          backgroundColor: defaultStyle.colors.light,
        },
        tabBarActiveTintColor: defaultStyle.colors.mainColorBlue,
        tabBarInactiveTintColor: defaultStyle.colors.grayAccent4,
      }}
    >
      <Screen
        name="MapaTab"
        component={MapStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="location" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Mapa" />,
          headerRight: () => (
            <TouchableOpacity
              // Estudar a biblioteca para renderizar correctamente botões no Header [React-native navigation]
              style={styles.container}
              onPress={() => {
                handleKiddoModalOpen();
              }}
            >
              <View>
                <Image
                  source={require("./../../assets/img/boy-avatar.png")}
                  style={styles.kiddoImg}
                />
              </View>
              <Text style={styles.textSurname}>Tiagão</Text>
            </TouchableOpacity>
          ),
          tabBarLabel: "Mapa",
        }}
      />
      <Screen
        name="LocationHistoryTab"
        component={LocationHistoryStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Histórico de Localização" />,
          tabBarLabel: "Histórico",
        }}
      />
      <Screen
        name="CercaTab"
        component={FencigStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonNewfecing size={size} color={color} focused={focused} />
          ),
          headerTitle: () => <Header name="Geo Cerca" />,
          tabBarLabel: "",
        }}
      />
      <Screen
        name="AlertasTab"
        component={AlertStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="notification" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Alertas" />,
          headerRight: () => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                alert("Configuração de alertas");
              }}
            >
              <Text style={styles.textConfig}>Configuração</Text>
            </TouchableOpacity>
          ),
          tabBarBadge: 3,
          tabBarLabel: "Alertas",
        }}
      />
      <Screen
        name="PerfilTab"
        component={ProfileAllStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
          headerTitle: () => <Header name="Perfil" />,
          tabBarLabel: "Perfil",
        }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  kiddoImg: {
    width: 40,
    height: 40,
  },
  textSurname: {
    marginLeft: 5,
    fontWeight: "bold",
    color: defaultStyle.colors.blueDarkColor2,
  },

  textConfig: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },
});
