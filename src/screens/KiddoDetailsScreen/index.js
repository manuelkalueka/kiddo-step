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
  Alert,
  ActivityIndicator,
} from "react-native";
import { useBatteryLevel } from "expo-battery";
import * as Network from "expo-network";

import { formatDate } from "../../../utils/format-date";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import { StatusBar } from "expo-status-bar";
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { useKiddo } from "../../contexts/kiddo";
import ActionButtom from "../../components/ActionButtom";
import DateTimePicker from "@react-native-community/datetimepicker";

const Schema = yup.object({
  fullName: yup
    .string()
    .required("Nome Completo é obrigatório")
    .test("fullName", "Insira um nome completo válido", (value) => {
      // Verifica se o valor contém pelo menos um espaço em branco
      return /\s/.test(value);
    }),
  surname: yup.string(),
  birthDate: Platform.OS === "android" ? yup.string() : yup.date(),
  gendre: yup.string(),
  avatar: yup.string(),
  bloodType: yup.string(),
  alergics: yup.string(),
});

const KiddoDetailsScreen = () => {
  const { kiddo, kiddoAge, editUser } = useKiddo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gendre: kiddo?.gendre,
      fullName: kiddo?.fullName,
      birthDate:
        Platform.OS === "ios"
          ? new Date(kiddo?.birthDate)
          : formatDate(new Date(kiddo?.birthDate)),
    },
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    try {
      await editUser(data);
      handleModalClose();
    } catch (error) {
      Alert.alert("Ocorreu um erro ao salvar dados da Criança");
    }
  };

  const navigation = useNavigation();

  const [netInfo, setNetInfo] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [isLoadingImagem, setIsLoadingImage] = useState(false);

  async function handleSelectImagem() {
    setIsLoadingImage(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        setSelectedImageUri(uri);
      }
    } catch (error) {
      console.log("Erro ao buscar imagem");
    } finally {
      setIsLoadingImage(false);
    }
  }

  async function imageClassification(imageUri) {}

  const pickerRef = useRef();

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

  const kiddoAvatar =
    kiddo?.gendre === "Masculino"
      ? require("../../../assets/img/boy-avatar.png")
      : require("../../../assets/img/girl-avatar.png");

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
            <Image
              source={
                selectedImageUri ? { uri: selectedImageUri } : kiddoAvatar
              }
              style={styles.avatar}
            />
            {isLoadingImagem ? (
              <ActivityIndicator
                size={"small"}
                color={defaultStyle.colors.mainBlue}
              />
            ) : (
              <TouchableOpacity
                style={styles.buttonChangeImg}
                onPress={() => handleSelectImagem()}
              >
                <Entypo
                  name="camera"
                  size={18}
                  color={defaultStyle.colors.blueLightColor1}
                />
              </TouchableOpacity>
            )}
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
            onPress={() => {
              handleModalClose();
              navigation.navigate("AlertasTab");
            }}
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
              handleModalClose();
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
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite o Nome Completo"
                  defaultValue={kiddo?.fullName}
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.msgAlerta}>{errors.fullName?.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.labels}>Alcunha</Text>
            <Controller
              name="surname"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite a Alcunha"
                  defaultValue={kiddo?.surname}
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <Text style={styles.labels}>Data de Nascimento</Text>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, onBlur, value } }) =>
                Platform.OS === "ios" ? (
                  <DateTimePicker
                    value={value || new Date(kiddo?.birthDate)}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || value;
                      onChange(currentDate);
                    }}
                    style={styles.input}
                  />
                ) : (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    defaultValue={`${formatDate(new Date(kiddo?.birthDate))}`}
                    value={value}
                    placeholder={`Data de nascimento Ex.: ${formatDate(
                      new Date()
                    )}`}
                    style={styles.input}
                  />
                )
              }
            />
            {errors.birthDate && (
              <Text style={styles.msgAlerta}>{errors.birthDate?.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.labels}>Género</Text>
            <Controller
              name="gendre"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  ref={pickerRef}
                  selectedValue={value || kiddo?.gendre}
                  onValueChange={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  itemStyle={{
                    height: Platform.OS === "ios" ? 50 : "auto",
                  }}
                >
                  <Picker.Item key={0} label="Masculino" value="Masculino" />
                  <Picker.Item key={1} label="Feminino" value="Feminino" />
                </Picker>
              )}
            />
          </View>
          <Text style={styles.sectionTitle}>Detalhes de Saúde</Text>
          <View>
            <Text style={styles.labels}>Tipo Sanguíneo</Text>
            <Controller
              name="bloodType"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite o tipo sanguíneo"
                  defaultValue={kiddo?.bloodType}
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <Text style={styles.labels}>Alergias</Text>
            <Controller
              name="alergics"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Descreve as Alergias e Restrições"
                  multiline={true}
                  editable={true}
                  numberOfLines={4}
                  defaultValue={kiddo?.alergics}
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.mainButtonContainer}>
          <ActionButtom
            textButton="Salvar Alterações"
            onPress={() => handleSubmit(sendForm)()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default KiddoDetailsScreen;
