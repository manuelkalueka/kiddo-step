import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Keyboard,
  Switch,
} from "react-native";
import ActionButtom from "../../components/ActionButtom";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";

const Schema = yup.object({
  geoName: yup.string().required("Informe um nome de identificação"),
  geoType: yup.string().required("Informe um tipo válido"),
});

export default function NewFecing({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: true,
      geoTarget: true, // Definindo o valor padrão do campo 'status' como true
    },
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    //Salvar os Dados e Voltar no Mapa
    navigation.navigate("Mapa");
  };

  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
      } else {
        Alert.alert(
          "Permissão de localização negada",
          "O aplicativo precisa de permissão de localização para funcionar corretamente."
        );
      }
    } catch (error) {
      console.error("Erro ao obter permissões de localização:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao obter permissões de localização."
      );
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    async function startLocationWatch() {
      try {
        watchPositionAsync(
          {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (response) => {
            setLocation(response);
            const { latitude, longitude } = response.coords;
            mapRef.current?.animateCamera({
              pitch: 70,
              center: {
                latitude,
                longitude,
              },
              heading: response.coords.heading,
            });
          }
        );
      } catch (error) {
        console.error("Erro ao iniciar a vigilância da localização:", error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao iniciar a vigilância da localização."
        );
      }
    }

    startLocationWatch();
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, [location]);

  // //Funções do Switch
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={defaultStyle.colors.mainColorBlue}
            />
            <Text>Obtendo localização...</Text>
          </View>
        ) : location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            camera={{
              pitch: 70,
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              heading: location.coords.heading,
            }}
            mapType="hybrid"
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
        ) : (
          <Text>Falha ao obter localização.</Text>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.interfaceContainer}
      >
        <Pressable
          onPress={handleDisableKeyboard(Keyboard)}
          style={{ height: "100%" }}
        >
          <Text style={styles.label}>Nome da Cerca</Text>
          <Controller
            name="geoName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.textInput}
              />
            )}
          />
          {errors.geoName && (
            <Text style={styles.msgAlerta}>{errors.geoName?.message}</Text>
          )}
          <Text style={styles.label}>Tipo de Cerca</Text>
          <Controller
            name="geoType"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.textInput}
              />
            )}
          />
          {errors.geoType && (
            <Text style={styles.msgAlerta}>{errors.geoType?.message}</Text>
          )}

          <View>
            <Text style={styles.label}>Aplicar Para</Text>
            <View style={styles.targetAvatarContainer}>
              <View style={styles.targetSide}>
                <Image source={kiddoAvatar} style={styles.avatar} />
                <Text style={styles.labelTarget}>Tiagão</Text>
              </View>
              <View style={styles.targetSide}>
                <Controller
                  name="geoTarget"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Switch
                      trackColor={{
                        false: "#767577",
                        true: defaultStyle.colors.mainColorBlue,
                      }}
                      thumbColor={
                        value ? defaultStyle.colors.blueLightColor1 : "#f4f3f4"
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.targetAvatarContainer}>
              <View style={styles.targetSide}>
                <Text style={styles.labelTarget}>Estado</Text>
              </View>
              <View style={[styles.targetSide, { marginBottom: 10 }]}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Switch
                      trackColor={{
                        false: "#767577",
                        true: defaultStyle.colors.mainColorBlue,
                      }}
                      thumbColor={
                        value ? defaultStyle.colors.blueLightColor1 : "#f4f3f4"
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <ActionButtom textButton="Salvar" onPress={handleSubmit(sendForm)} />
        </Pressable>
      </ScrollView>
    </View>
  );
}
