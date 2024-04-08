import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";

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

  const handleChange = useCallback((index) => {
    //Se o bottomSheet arrastado todo ele para baixo então fecha o modal
    if (index == -1) {
      setisModal2Visible(false);
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setisModal2Visible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const bottomSheet = useRef(null);
  const snapPoints = useMemo(() => ["50%", "86%"], []);

  return (
    <Fragment>
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
            headerTitle: () => <Header name="Criar Geo Cerca" />,
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
                onPress={() => setisModal2Visible(true)} //Põe visible o modal do bottomSheet
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
      <Modal transparent={true} visible={isModal2Visible}>
        <View style={styles.modalFocus}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
              ref={bottomSheet}
              index={1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onChange={handleChange}
              backgroundStyle={{ backgroundColor: defaultStyle.colors.light }}
              handleIndicatorStyle={{
                backgroundColor: defaultStyle.colors.mainColorBlue,
              }}
            >
              <View style={styles.containerAlert}>
                <Text>Configuração de alertas</Text>

                <Text style={styles.labels}> Tipo de alerta</Text>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                  style={styles.input}
                >
                  <Picker.Item label="Selecione o tipo de alerta" value={""} />
                  <Picker.Item label="Entrada a escola" value={1} />
                  <Picker.Item label="Saída da escola" value={2} />
                  <Picker.Item label="Entrada em área restrita" value={3} />
                </Picker>
              </View>
            </BottomSheet>
          </GestureHandlerRootView>
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

  textConfig: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },

  modalFocus: {
    height: "100%",
    width: "100%",
    backgroundColor: "#0009",
  },

  containerAlert: {
    padding: 20,
  },

  labels: {
    fontSize: defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.dark,
    marginVertical: 10,
    fontWeight: "300",
  },

  input: {
    paddingVertical: Platform.OS === "ios" ? 16 : 8,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
  },
});
