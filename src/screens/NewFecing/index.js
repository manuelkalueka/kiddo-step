import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import ActionButtom from "../../components/ActionButtom";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { getKiddoInfo } from "../../services/kiddo-service";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { createGeoFence } from "../../services/geofence";

const Schema = yup.object({
  name: yup.string().required("Informe um nome de identificação"),
  geoType: yup.string(),
  target: yup.bool(),
  status: yup.bool(),
});

export default function NewFecing() {
  const navigation = useNavigation();
  const [kiddo, setKiddo] = useState(null);
  const { user } = useAuth();

  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [radius, setradius] = useState(100); // Valor padrão do raio da GeoFence

  useEffect(() => {
    async function getKiddo() {
      const newKiddo = await getKiddoInfo(user);
      setKiddo(newKiddo);
    }
    getKiddo();
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
      const status = await createGeoFence(geoFenceData, kiddo._id);
      if (status === 200 || status === 201) {
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
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const pickerGeoRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <MapView
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
            }}
            onPress={handleMapPress}
          >
            {markerPosition && (
              <>
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
          <Text style={styles.label}>Tipo de Cerca</Text>
          <Controller
            name="geoType"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                ref={pickerGeoRef}
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
                style={styles.pickInput}
                itemStyle={{
                  height: Platform.OS === "ios" ? 50 : "auto",
                  fontSize: 16,
                }}
              >
                <Picker.Item key={0} label="Entrada" value={true} />
                <Picker.Item key={1} label="Saída" value={false} />
              </Picker>
            )}
          />

          <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={1000}
            thumbTintColor={defaultStyle.colors.white}
            minimumTrackTintColor={defaultStyle.colors.mainColorBlue}
            maximumTrackTintColor={defaultStyle.colors.blueLightColor1}
            step={50}
            value={radius}
            onValueChange={(value) => setradius(value)}
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
