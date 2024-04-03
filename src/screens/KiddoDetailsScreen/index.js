import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import { StatusBar } from "expo-status-bar";
import { handleDisableKeyboard } from "../../utils/dismiss-keyboard";

const KiddoSchema = yup.object({
  fullName: yup.string().required("Informe o Nome Completo"),
  gender: yup.string().required("Informe o Genero"),
});

const KiddoDetailsScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(KiddoSchema),
  });

  const sendForm = (data) => {
    console.log(data);
  };

  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState();

  const pickerRef = useRef();

  function openPicker() {
    pickerRef.current.focus();
  }

  function closePicker() {
    pickerRef.current.blur();
  }

  const STATUS_DEVICE = true;
  const BIRTH_DATE = () => {
    const date = new Date().toLocaleDateString();
    return date;
  };

  function handleModalClose() {
    navigation?.goBack();
  }

  const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");

  function modalTiago() {
    return (
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
    );
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
  /*
  De Tiago "Quando clicar no botão config da screen alertas, abre um modal e dentro do modal contem o bottomSheet e o formulário para cadastrar ou config os alertas." 
*/

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="auto" backgroundColor="#000" />
      )}
      <TouchableOpacity
        onPress={handleModalClose}
        style={styles.containerButton}
      >
        <Text style={styles.buttonIcon}>Fechar</Text>
      </TouchableOpacity>
      <Pressable
        style={styles.picContainer}
        onPress={() => handleDisableKeyboard(Keyboard)}
      >
        <View style={styles.detailContainer}>
          <View>
            <Image source={kiddoAvatar} style={styles.avatar} />
            <TouchableOpacity style={styles.buttonChangeImg}>
              <Entypo
                name="camera"
                size={18}
                color={defaultStyle.colors.blueLightColor1}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.headerSurname}>Tiagão</Text>
              <Text style={styles.headerAge}>5 anos</Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.buttonStatusContainer}>
                <View
                  style={[
                    styles.buttonStatusIcon,
                    {
                      backgroundColor:
                        STATUS_DEVICE === true
                          ? defaultStyle.colors.success
                          : defaultStyle.colors.danger,
                    },
                  ]}
                ></View>
                <Text style={styles.textStatus}>
                  {STATUS_DEVICE === true ? "online" : "offline"}
                </Text>
              </View>
              <View style={styles.buttonBatteryContainer}>
                <FontAwesome
                  name="battery"
                  color={
                    STATUS_DEVICE === true
                      ? defaultStyle.colors.success
                      : defaultStyle.colors.danger
                  }
                />
                <Text style={styles.textStatus}>75%</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate("AlertasTab")}
          >
            <MaterialIcons
              name="add-alert"
              size={25}
              color={defaultStyle.colors.white}
            />
            <Text style={styles.textAction}>Definir Alerta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              navigation.navigate("CercaTab");
            }}
          >
            <MaterialIcons
              name="add-location-alt"
              size={25}
              color={defaultStyle.colors.white}
            />
            <Text style={styles.textAction}>Nova Geo-cerca</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <ScrollView style={styles.bodyDetails}>
        <View>
          <View>
            <Text style={styles.labels}>Nome Completo</Text>
            <TextInput
              placeholder="Digite o Nome Completo"
              value="TIAGO LUIS PEREIRA"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.labels}>Data de Nascimento</Text>
            <TextInput value={BIRTH_DATE().toString()} style={styles.input} />
          </View>
          <View>
            <Text style={styles.labels}>Gênero</Text>
            <Picker
              ref={pickerRef}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              onBlur={closePicker}
              onFocus={openPicker}
              style={{ width: 150, height: 50 }}
            >
              <Picker.Item key={0} label="Java" value="java" />
              <Picker.Item key={1} label="JavaScript" value="js" />
            </Picker>
          </View>
          <Text style={styles.sectionTitle}>Detalhes de Saúde</Text>
          <View>
            <Text style={styles.labels}>Tipo Sanguíneo</Text>
            <TextInput
              placeholder="Digite o tipo sanguíneo"
              value="A+"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.labels}>Alergias</Text>
            <TextInput
              placeholder="Descreve as Alergias e Restrições"
              multiline={true}
              editable={true}
              numberOfLines={4}
              value="TIAGO LUIS PEREIRA"
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.mainButtonContainer}>
          <TouchableOpacity style={styles.MainButton}>
            <Text style={styles.textButton}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default KiddoDetailsScreen;
