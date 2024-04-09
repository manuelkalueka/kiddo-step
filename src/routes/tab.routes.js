import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import defaultStyle from "../defaultStyle";
import { handleDisableKeyboard } from "../../utils/dismiss-keyboard";

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
  const snapPoints = useMemo(() => ["55%", "70%"], []);

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
                
                <FontAwesome5 name='cog' size={25} color={defaultStyle.colors.white}/>
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
              <BottomSheetScrollView
                style={styles.bottomSheetScrollView}
              >
              
              <View style={styles.containerAlert}>
                <Text style={styles.titleBottomSheet}>Configuração de alertas</Text>

                <Text style={styles.labels}>Designação</Text>
                <TextInput
                style={styles.input}
                />

                <Text style={styles.labels}>Tipo de alerta</Text>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                  style={styles.inputcombox}
                >
                  <Picker.Item label="Entrada" value={1} />
                  <Picker.Item label="Saída" value={2} />
                </Picker>

                <Text style={styles.labels}>Quando</Text>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                  style={styles.inputcombox}
                >
                  <Picker.Item label="1" value={1} />
                  <Picker.Item label="2" value={2} />
                </Picker>

                <TouchableOpacity style={styles.buttonSave}>
                  <Text style={styles.textBtnSave}>Salvar</Text>
                </TouchableOpacity>

              </View>
              </BottomSheetScrollView>
 
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

  inputcombox: {
    paddingVertical: Platform.OS === "ios" ? 16 : 10,
    paddingHorizontal: 5,
    fontSize: 16,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
  },

  input: {
    paddingVertical: Platform.OS === "ios" ? 16 : 10,
    paddingHorizontal: 5,
    fontSize: 16,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
  },

  buttonSave: {
    marginVertical: '8%',
    padding: 16,
    backgroundColor: defaultStyle.colors.mainColorBlue,
    borderRadius: defaultStyle.borderRadio.borderRadioButton.small,
  },

  textBtnSave: {
    textAlign: "center",
    fontSize: defaultStyle.sizes.subtitle,
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },

  titleBottomSheet: {
    fontSize: defaultStyle.sizes.title,
    color: defaultStyle.colors.black,
    fontWeight: 'bold'
  },

  bottomSheetScrollView: {
    height: '100%'
  }
  

});
