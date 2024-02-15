import { Fragment, useState } from "react";
import {
  Modal,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, FontAwesome } from "@expo/vector-icons";

import defaultStyle from "../defaultStyle";

import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import Profile from "../screens/Profile";
import NewFecing from "../screens/NewFecing";
import Map from "../screens/Map";
import KiddoDetailsScreen from "./../screens/KiddoDetailsScreen";

import ButtonNewfecing from "../components/ButtonNewfecing";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleKiddoModalOpen() {
    setIsModalVisible(true);
  }

  function handleModalClose() {
    setIsModalVisible(false);
  }

  return (
    <Fragment>
      <Navigator
        initialRouteName="Mapa"
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
          name="Mapa"
          component={Map}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Entypo name="location" size={size} color={color} />
            ),
            headerTitle: () => <Header name="Mapa" />,
            headerRight: () => (
              <TouchableOpacity
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
      <Modal
        visible={isModalVisible}
        onRequestClose={handleModalClose}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ flex: 1 }}>
          <KiddoDetailsScreen />
          <TouchableOpacity
            onPress={handleModalClose}
            style={styles.containerButton}
          >
            <Text>
              <FontAwesome
                name="close"
                size={18}
                color={defaultStyle.colors.white}
              />
            </Text>
            <Text style={styles.buttonIcon}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Fragment>
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
  containerButton: {
    position: "absolute",
    top: "2%",
    left: "2%",
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginLeft: 5,
    fontSize: 16,
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },
});
