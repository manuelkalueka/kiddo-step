import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";

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
import ActionButtom from "../components/ActionButtom";

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
          headerTitle: () => (<Header name="Mapa" />),
        }}
        />
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
            headerRight: () => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => setisModal2Vissible(true)}//Põe visible o modal do bottomSheet
              >
               <Text style={styles.textConfig}> <FontAwesome name="gear" size={25}/></Text>
              </TouchableOpacity>    
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
        <TouchableOpacity
              style={styles.container}
              onPress={() => {
                handleKiddoModalOpen();
              }}
            >
              </TouchableOpacity>
      </Modal> 
              <View>
                <Image
                  source={require("./../../assets/img/boy-avatar.png")}
                  style={styles.kiddoImg}
                />

              <View style={styles.containerAlert}>
                  <Text style={styles.headerTitle}>Configurar um novo alerta</Text>

                  <Text style={styles.labels}> Tipo de alerta</Text>
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex)=>setSelectedValue(itemValue)}
                    style={{ height: 42,justifyContent:'center'}}
                  >
                    <Picker.Item label="Selecione o tipo de alerta" value={''} />
                    <Picker.Item label="Entrada" value={1} />
                    <Picker.Item label="Saída" value={2} />
                    <Picker.Item label="Área restrita" value={3} />

                  </Picker>
                  
                  <Text style={styles.labels}> Observação</Text>
                  <TextInput
                    style={[, {color: 'red', fontSize:16, padding: 10}]}
                    
                  />

                  <ActionButtom
                    textButton = 'Guardar as alterações'
                    onPress={()=>alert('Guardada')}
                  />

              </View>
              </View>
              <Text style={styles.textSurname}>Tiagão</Text>
         
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
    paddingVertical: Platform.OS === "ios" ? 20 : 8,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
  }

});
