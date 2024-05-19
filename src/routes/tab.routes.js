import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
  Switch,
  TextInput,
  Alert,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

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
import { useKiddo } from "../contexts/kiddo";
import { getGeoFencings } from "../services/geo-fencing-service";
import ActionButtom from "../components/ActionButtom";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveAlertSchedule } from "../services/alert-service";

const Schema = yup.object({
  title: yup.string().required("Precisa preencher a designação"),
  type: yup.string(),
  geofecing: yup.string().required("Selecione um geoFecing"),
  hourTrigger: yup.string(),
});

export default function TabRoutes() {
  const { kiddo } = useKiddo();
  const [geoFences, setGeoFences] = useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isModal2Visible, setisModal2Visible] = useState(false);

  const [date, setDate] = useState(new Date());

  const bottomSheet = useRef(null);
  const snapPoints = useMemo(() => ["55%", "70%"], []);

  const pickerAlertRef = useRef();
  const pickerGeofencigRef = useRef();
  const avatar =
    kiddo?.gendre === "Masculino"
      ? require("./../../assets/img/boy-avatar.png")
      : require("./../../assets/img/girl-avatar.png");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "Entrada",
    },
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    try {
      //verificar se existe date;
      const alertData = isEnabled ? { ...data, date } : data;
      const response = await saveAlertSchedule(alertData);
      if (response.status === 201) {
        Alert.alert("Sucesso", `Alerta definido com sucesso!`);
      }
    } catch (error) {
      Alert(error, "Tente Novamente!");
    }
  };

  async function getGeoFence() {
    try {
      if (kiddo) {
        const fence = await getGeoFencings(kiddo);
        setGeoFences(fence);
      }
    } catch (error) {
      console.log("Erro ao buscar cercas", error);
    }
  }

  useEffect(() => {
    getGeoFence();
  }, [kiddo]);

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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const [notificationCount, setNotificationCount] = useState(0);

  // useEffect(() => {
  //   const getNotifications = async () => {
  //     const { notifications } =
  //       await Notifications.getAllScheduledNotificationsAsync();
  //     setNotificationCount(notifications.length);
  //   };

  //   getNotifications();

  //   const subscription = Notifications.addNotificationReceivedListener(() => {
  //     getNotifications();
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <>
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
                  <Image source={avatar} style={styles.kiddoImg} />
                </View>
                <Text style={styles.textSurname}>{kiddo?.surname}</Text>
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
                onPress={() => {
                  setisModal2Visible(true);
                }} //Põe visible o modal do bottomSheet
              >
                <FontAwesome5
                  name="cog"
                  size={25}
                  color={defaultStyle.colors.white}
                />
              </TouchableOpacity>
            ),
            tabBarBadge: notificationCount > 0 ? notificationCount : null,
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
              <BottomSheetScrollView style={styles.bottomSheetScrollView}>
                <View style={styles.containerAlert}>
                  <Text style={styles.titleBottomSheet}>
                    Configuração de alertas
                  </Text>

                  <Text style={styles.labels}>Designação</Text>

                  <Controller
                    name="title"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {errors.title && (
                    <Text style={styles.msgAlerta}>
                      {errors.title?.message}
                    </Text>
                  )}

                  <Text style={styles.labels}>Tipo de alerta</Text>

                  <Controller
                    name="type"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Picker
                        ref={pickerAlertRef}
                        selectedValue={value || "Entrada"}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        style={styles.textInput}
                        itemStyle={{
                          height: Platform.OS === "ios" ? 50 : "auto",
                        }}
                      >
                        <Picker.Item key={0} label="Entrada" value="Entrada" />
                        <Picker.Item key={1} label="Saida" value="Saida" />
                      </Picker>
                    )}
                  />

                  <Text style={styles.labels}>Cerca virtual</Text>
                  <Controller
                    name="geofecing"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Picker
                        ref={pickerGeofencigRef}
                        selectedValue={value || "Escola"}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        style={styles.textInput}
                        itemStyle={{
                          height: Platform.OS === "ios" ? 50 : "auto",
                        }}
                      >
                        {geoFences.map((item) => (
                          <Picker.Item
                            key={item._id}
                            label={item.name}
                            value={item._id}
                          />
                        ))}
                      </Picker>
                    )}
                  />

                  <View style={styles.containerSwitch}>
                    <Text style={styles.labels}>Definir hora ?</Text>
                    <Switch
                      style={styles.switchTime}
                      trackColor={{
                        false: "#767577",
                        true: defaultStyle.colors.mainColorBlue,
                      }}
                      thumbColor={
                        isEnabled
                          ? defaultStyle.colors.blueLightColor1
                          : "#f4f3f4"
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                  {isEnabled && (
                    <View>
                      <Controller
                        name="hourTrigger"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder={`Digite a hora ex.: ${new Date().getHours()}:${new Date().getMinutes()}`}
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                    </View>
                  )}

                  <ActionButtom
                    textButton="Salvar"
                    onPress={() => {
                      handleSubmit(sendForm)(); //Tiago, faltava adicionar o () fora
                    }}
                  />
                </View>
              </BottomSheetScrollView>
            </BottomSheet>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
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
    borderWidth: 1,
    borderColor: defaultStyle.colors.mainColorBlue,
  },

  buttonSave: {
    marginVertical: "8%",
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
    fontWeight: "bold",
  },

  bottomSheetScrollView: {
    height: "100%",
  },

  containerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  switchTime: {
    alignSelf: "center",
  },

  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
  },
});
