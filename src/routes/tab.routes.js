import { Fragment, useState, useMemo, useRef, useCallback } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { Picker } from '@react-native-picker/picker'


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";

import defaultStyle from "../defaultStyle";

import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import Profile from "../screens/Profile";
import NewFecing from "../screens/NewFecing";
import Map from "../screens/Map";
import KiddoDetailsScreen from "./../screens/KiddoDetailsScreen";

import ButtonNewfecing from "../components/ButtonNewfecing";
import Header from "../components/Header";
import ActionButtom from "../components/ActionButtom";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export default function TabRoutes() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setisModal2Vissible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null)

  const bottomSheet = useRef(null)
  const snapPoints = useMemo(()=>['50%', '86%'], []) 

  function handleKiddoModalOpen() {
    setIsModalVisible(true);
  }

  function handleModalClose() {
    setIsModalVisible(false);
  }

  const handleChange = useCallback((index)=>{
    //Se o bottomSheet arrastado todo ele para baixo então fecha o modal
    if(index == -1){
      setisModal2Vissible(false)
    }
  },[])

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

        <View style={{ flex: 1 }}>
          <KiddoDetailsScreen />
          <TouchableOpacity
            onPress={handleModalClose}
            style={styles.containerButton}
          >
            <Text style={styles.buttonIcon}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal
        transparent={true}
        visible={isModal2Visible}
      >
        <View style={styles.modalFocus}>
        
          <GestureHandlerRootView style={{flex:1}}>
            <BottomSheet
              ref={bottomSheet}
              index={1}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onChange={handleChange}
              backgroundStyle={{backgroundColor: defaultStyle.colors.light,}}
              handleIndicatorStyle={{backgroundColor: defaultStyle.colors.mainColorBlue}}
            >
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
            </BottomSheet>
          </GestureHandlerRootView>
        </View>
      </Modal>
   

    </Fragment>
    
  );
}
/*
  De Tiago "Quando clicar no botão config da screen alertas, abre um modal e dentro do modal contem o bottomSheet e o formulário para cadastrar ou config os alertas." 
*/

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
    right: "2%",
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
  },

  textConfig: {
    color: defaultStyle.colors.white,
    fontWeight: 'bold'
  },

  modalFocus: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0009'
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

  },

  headerTitle: {
    color: defaultStyle.colors.dark,
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.titleSmall,
    paddingVertical:10,
  }

});
