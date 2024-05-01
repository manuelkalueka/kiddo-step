import React, { useState, useRef, Fragment, useEffect } from "react";
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
import { useBatteryLevel } from "expo-battery";
import * as Network from "expo-network";

import { formatDate } from "../../../utils/format-date";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import { StatusBar } from "expo-status-bar";
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import PickerModal from "../../components/PickerModal";
import { useKiddo } from "../../contexts/kiddo";

const KiddoSchema = yup.object({
  fullName: yup.string().required("Informe o Nome Completo"),
  gender: yup.string().required("Informe o Genero"),
});

const KiddoDetailsScreen = () => {
  const { kiddo, kiddoAge } = useKiddo();

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

  const [selectedGendre, setSelectedGendre] = useState();
  const itemsPicker = ["Masculino", "Feminino"];
  const [visiblePicker, setVisiblePicker] = useState(false);

  const [pickerResult, setPickerResult] = useState("Masculino");
  const [netInfo, setNetInfo] = useState(false);

  const pickerRef = useRef();

  function openPicker() {
    pickerRef.current.focus();
  }

  function closePicker() {
    pickerRef.current.blur();
  }

  async function getNetInfoOnDevice() {
    try {
      const { isConnected, isInternetReachable } =
        await Network.getNetworkStateAsync();
      const currentStatus = isConnected && isInternetReachable;
      setNetInfo(currentStatus);
    } catch (error) {
      console.log("Erro ao pegar a rede ", error);
    }
  }

  useEffect(() => {
    getNetInfoOnDevice();
  }, [kiddo]);

  const battery = useBatteryLevel(); //Pega o nivel da bateria, NORMALMENTE PEGAR DO KIDDO
  const BATTERY_LEVEL = Math.floor(battery * 100);
  const STATUS_DEVICE = netInfo;

  function handleModalClose() {
    navigation?.goBack();
  }

  const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");

  const onClose = () => {
    setVisiblePicker(false);
  };

  const onSelect = (value) => {
    setPickerResult(value);
  };

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
              <Text style={styles.headerSurname}>{kiddo?.surname}</Text>
              <Text style={styles.headerAge}>
                {kiddoAge > 1 ? `${kiddoAge} anos` : `${kiddoAge} ano`}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.buttonStatusContainer}>
                <View
                  style={[
                    styles.buttonStatusIcon,
                    {
                      backgroundColor: STATUS_DEVICE
                        ? defaultStyle.colors.success
                        : defaultStyle.colors.danger,
                    },
                  ]}
                ></View>
                <Text style={styles.textStatus}>
                  {STATUS_DEVICE ? "online" : "offline"}
                </Text>
              </View>
              <View style={styles.buttonBatteryContainer}>
                <FontAwesome
                  name="battery"
                  color={
                    BATTERY_LEVEL < 50 && BATTERY_LEVEL > 20
                      ? defaultStyle.colors.warning
                      : BATTERY_LEVEL > 50
                      ? defaultStyle.colors.success
                      : defaultStyle.colors.danger
                  }
                />
                <Text style={styles.textStatus}>{BATTERY_LEVEL}%</Text>
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
              defaultValue={kiddo?.fullName}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.labels}>Data de Nascimento</Text>
            <TextInput
              defaultValue={formatDate(kiddo?.birthDate)}
              style={styles.input}
            />
          </View>
          <View>
            {Platform.OS === "android" ? (
              <Fragment>
                <Text style={styles.labels}>Gênero</Text>
                <Picker
                  ref={pickerRef}
                  selectedValue={selectedGendre}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedGendre(itemValue)
                  }
                  onBlur={closePicker}
                  onFocus={openPicker}
                  style={{ width: 150, height: 50 }}
                >
                  <Picker.Item key={0} label="Masculino" value="Masculino" />
                  <Picker.Item key={1} label="Feminino" value="Feminino" />
                </Picker>
              </Fragment>
            ) : (
              <Fragment>
                <Text style={styles.labels}>Genero</Text>
                <TextInput
                  defaultValue={pickerResult}
                  style={styles.input}
                  editable={false}
                  onPressIn={() => {
                    setVisiblePicker(true);
                  }}
                />
                <PickerModal
                  items={itemsPicker}
                  title="Gênero"
                  visible={visiblePicker}
                  onClose={onClose}
                  onSelect={onSelect}
                />
              </Fragment>
            )}
          </View>
          <Text style={styles.sectionTitle}>Detalhes de Saúde</Text>
          <View>
            <Text style={styles.labels}>Tipo Sanguíneo</Text>
            <TextInput
              placeholder="Digite o tipo sanguíneo"
              defaultValue={kiddo?.bloodType}
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
              defaultValue={kiddo?.alergics}
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
