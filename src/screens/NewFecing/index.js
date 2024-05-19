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
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import ActionButtom from "../../components/ActionButtom";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  requestBackgroundPermissionsAsync,
  stopGeofencingAsync,
  startGeofencingAsync,
  GeofencingEventType,
  startLocationUpdatesAsync,
  Accuracy,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notify from "expo-notifications";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { getKiddoInfo } from "../../services/kiddo-service";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { createGeoFence } from "../../services/geo-fencing-service";
import styles from "./styles";
import defaultStyle from "../../defaultStyle";

const schema = yup.object({
  name: yup.string().required("Informe um nome de identificação"),
  target: yup.bool(),
  status: yup.bool(),
});

const NewFencing = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [kiddo, setKiddo] = useState(null);
  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [radius, setRadius] = useState(100);
  const [loadingMap, setLoadingMap] = useState(true);
  const [mapType, setMapType] = useState("standard");
  const mapRef = useRef();

  const kiddoAvatar =
    kiddo?.gendre === "Masculino"
      ? require("../../../assets/img/boy-avatar.png")
      : require("../../../assets/img/girl-avatar.png");

  useEffect(() => {
    const fetchKiddo = async () => {
      const newKiddo = await getKiddoInfo(user);
      setKiddo(newKiddo);
    };
    fetchKiddo();
  }, [user]);

  useEffect(() => {
    const loadMapType = async () => {
      const mtype = await AsyncStorage.getItem("@MapType");
      if (mtype) setMapType(mtype);
    };
    loadMapType();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: true,
      target: true,
      geoType: true,
    },
    resolver: yupResolver(schema),
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
        if (Platform.OS === "android") {
          await GeofencingActivity(
            data.name,
            latitude,
            longitude,
            radius,
            data.status
          );
        }
      } else {
        Alert.alert("Erro", "Tente Novamente!");
      }
    } catch (error) {
      console.log("Erro ao Salvar Fence", error);
    }
  };

  useEffect(() => {
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
    getLocationAsync();
    return () => {
      stopLocationUpdatesAsync("BACK_TRACKING");
    };
  }, []);

  const handleMapPress = (e) => {
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const requestBackLocation = async () => {
    try {
      const { status: backgroundStatus } =
        await requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        await startLocationUpdatesAsync("BACK_TRACKING", {
          accuracy: Accuracy.Balanced,
        });
      }
    } catch (error) {
      console.log("Não permitido localização background ", error);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestBackLocation();
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      TaskManager.defineTask("BACK_TRACKING", ({ data, error }) => {
        if (error) {
          console.log(error.message);
          return;
        }
        if (data) {
          const { locations } = data;
          console.log("Localizações no Back", locations);
        }
      });
    }
  }, []);

  const stopGeofencing = () => {
    stopGeofencingAsync("geofencing")
      .then(() => console.log("Geofencing parado com sucesso"))
      .catch((error) => console.error("Erro ao parar geofencing:", error));
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      return () => stopGeofencing();
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      TaskManager.defineTask(
        "geofencing",
        ({ data: { eventType, region }, error }) => {
          if (error) {
            console.log("Erro no gestor de tarefas ", error);
            return;
          }
          if (eventType === GeofencingEventType.Enter) {
            console.log("You've entered region:", region);
          } else if (eventType === GeofencingEventType.Exit) {
            console.log("You've left region:", region);
          }
        }
      );
    }
  }, []);

  const GeofencingActivity = async (
    nome,
    latitude,
    longitude,
    radius,
    status
  ) => {
    try {
      const entry = status === true ? true : false;
      const exit = status !== entry ? true : false;
      const geofence = {
        identifier: nome,
        latitude,
        longitude,
        radius,
        notifyOnEnter: entry,
        notifyOnExit: exit,
      };
      await startGeofencingAsync("geofencing", [geofence]);
      await handlerNotify(geofence);
    } catch (error) {
      Alert.alert(
        "Erro ao iniciar o monitoramento da Área Segura",
        error.message
      );
    }
  };

  const requestNotifyPermissions = async () => {
    try {
      const { status } = await Notify.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Precisa Fornecer permissão para os alertas");
        return;
      }
    } catch (error) {
      console.log("Erro ao dar permissão das notificações ", error);
    }
  };

  Notify.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const handlerNotify = async (geocerca) => {
    await requestNotifyPermissions();
    await Notify.scheduleNotificationAsync({
      content: {
        title:
          "Área Segura para " + geocerca.identifier + " de " + kiddo?.surname,
        body: "As Próximas Notificações serão de entrada e/ou Saída desta área",
        data: { data: geocerca.latitude },
      },
      trigger: null,
    });
  };

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
              pitch: 45,
              heading: 90,
            }}
            onPress={handleMapPress}
            onMapReady={() => {
              if (markerPosition) {
                mapRef.current?.fitToCoordinates([markerPosition], {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
            mapType={"hybrid"}
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
                  title={`Cerca para ${kiddo?.surname}`}
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
            minimumValue={1}
            maximumValue={1000}
            thumbTintColor={defaultStyle.colors.white}
            minimumTrackTintColor={defaultStyle.colors.mainColorBlue}
            maximumTrackTintColor={
              Platform.OS !== "android"
                ? defaultStyle.colors.blueLightColor1
                : defaultStyle.colors.blueDarkColor2
            }
            step={10}
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
          <ActionButtom
            textButton="Salvar"
            onPress={handleSubmit(sendForm)}
            disabled={loadingMap ? true : false}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default NewFencing;
