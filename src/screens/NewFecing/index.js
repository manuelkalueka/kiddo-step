import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Keyboard,
  Switch,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import ActionButtom from "../../components/ActionButtom";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  requestForegroundPermissionsAsync, //Serve para pedir a Localização enquanto o App é Executado
  getCurrentPositionAsync, //Pega a Localização Actual
} from "expo-location";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { getKiddoInfo } from "../../services/kiddo-service"; //Pegar a Criança na DB
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { createGeoFence } from "../../services/geofence"; //Criar Geo Cerca
import AsyncStorage from "@react-native-async-storage/async-storage";

const Schema = yup.object({
  name: yup.string().required("Informe um nome de identificação"),
  target: yup.bool(),
  status: yup.bool(),
});

export default function NewFecing() {
  const navigation = useNavigation();
  const [kiddo, setKiddo] = useState(null);
  const { user } = useAuth();

  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [radius, setRadius] = useState(100); // Valor padrão do raio da GeoFence
  const [loadingMap, setLoadingMap] = useState(true);
  const [mapType, setMapType] = useState("standard");

  useEffect(() => {
    async function getKiddo() {
      const newKiddo = await getKiddoInfo(user);
      setKiddo(newKiddo);
    }
    getKiddo();
  }, [user]);

  useEffect(() => {
    async function loadMapType() {
      const mtype = await AsyncStorage.getItem("@MapType");
      setMapType(mtype);
    }

    loadMapType;
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: true,
      target: true, // Definindo o valor padrão do campo 'status' como true
      geoType: true,
    },
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    const { latitude, longitude } = location.coords;
    const geoFenceData = {
      ...data,
      radius,
      latitude,
      longitude,
    };
    try {
      const status = await createGeoFence(geoFenceData, kiddo._id); //Salvar a Fence
      if (status === 200 || status === 201) {
        //Mudar de Tela de Tudo Correr Bem
        navigation.navigate("Mapa");
      } else {
        Alert.alert("Erro", "Tente Novamente!");
      }
    } catch (error) {
      console.log("Erro ao Salvar Fence", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
        setMarkerPosition({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        });
        setLoadingMap(false);
      } else {
        Alert.alert(
          "Permissão de localização negada",
          "O aplicativo precisa de permissão de localização para funcionar corretamente."
        );
      }
    } catch (error) {
      console.log("Erro ao buscar localização no Fencing ", error);
    }
  };

  const handleMapPress = (e) => {
    //Captura no Evento de Click no Mapa e Muda o Pin para a localização Clicada
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && !loadingMap ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: markerPosition
                ? markerPosition.latitude
                : location.coords.latitude,
              longitude: markerPosition
                ? markerPosition.longitude
                : location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              pitch: 45, // Inclinação da câmera em graus (0 é vista de cima)
              heading: 90, // Direção da câmera em graus em relação ao norte
            }}
            onPress={handleMapPress}
            onMapReady={() => {
              // Centralize a câmera no marcador e ajuste o zoom para incluir o marcador na visualização
              if (markerPosition) {
                mapRef.current?.fitToCoordinates([markerPosition], {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
            mapType={mapType} //Mudar dinamicamente em função ao Mapa Principal
          >
            {markerPosition && (
              <>
                {/* Funciona como o Fragment*/}
                <Circle
                  center={markerPosition}
                  radius={radius}
                  strokeColor="rgba(162, 196, 224,1)"
                  fillColor="rgba(162, 196, 224,0.3)"
                />
                <Marker
                  coordinate={markerPosition}
                  title="Cerca Geográfica"
                  description="Aqui é onde a Cerca Será Criada"
                />
              </>
            )}
          </MapView>
        ) : (
          <View style={styles.mapContainer}>
            <ActivityIndicator
              size={"large"}
              color={defaultStyle.colors.mainColorBlue}
            />
            <Text style={{ marginTop: 10 }}>Carregando o mapa...</Text>
          </View>
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
            name="name"
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
          {errors.name && (
            <Text style={styles.msgAlerta}>{errors.name?.message}</Text>
          )}

          <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={1000}
            thumbTintColor={defaultStyle.colors.white}
            minimumTrackTintColor={defaultStyle.colors.mainColorBlue}
            maximumTrackTintColor={defaultStyle.colors.blueLightColor1}
            step={50}
            value={radius}
            onValueChange={(value) => setRadius(value)}
          />
          <Text style={styles.radiusText}>
            Limite da Cerca: {radius} metros
          </Text>

          <View>
            <Text style={styles.label}>Aplicar Para</Text>
            <View style={styles.targetAvatarContainer}>
              <View style={styles.targetSide}>
                <Image source={kiddoAvatar} style={styles.avatar} />
                <Text style={styles.labelTarget}>{kiddo?.surname}</Text>
              </View>
              <View style={styles.targetSide}>
                <Controller
                  name="target"
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
