import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  stopLocationUpdatesAsync,
  LocationAccuracy,
} from "expo-location"; //Módulo de localização
import getDistance from "geolib/es/getDistance"; //calculo de distancia
import { useAuth } from "../../contexts/auth"; // Contexto do Usuário
import { getLastLocation, saveLocation } from "../../services/location-service"; //Serviço para interagir com a API
import { Tracker } from "../../../tracker-data";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKiddo } from "../../contexts/kiddo";

const Map = () => {
  const [location, setLocation] = useState(null); //Localização actual
  const [loadingMap, setLoadingMap] = useState(true);
  const [mapType, setMapType] = useState("standard"); //Tipo de Mapa em função ao botão [Sattelite ou standard]

  async function toggleSetMapType() {
    if (mapType === "standard") {
      setMapType("hybrid");
    } else if (mapType === "hybrid") {
      setMapType("standard");
    }
    await AsyncStorage.setItem("@MapType", mapType); //Salva o Tipo no Storage
  }

  const { kiddo } = useKiddo();

  const mapRef = useRef();

  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentLocation = await getCurrentPositionAsync();
        setLocation(currentLocation);
      } else {
        Alert.alert(
          "Permissão de localização negada",
          "O aplicativo precisa de permissão de localização para funcionar corretamente."
        );
      }
    } catch (error) {
      console.error("Erro ao obter permissões de localização:", error);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    async function startLocationWatch() {
      try {
        await watchPositionAsync(
          {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 2000,
            distanceInterval: 10, //distancia de 10 metros
          },
          (response) => {
            setLocation(response);
            handleLocationUpdate(response);
            setLoadingMap(false);
          }
        );
      } catch (error) {
        console.error("Erro ao iniciar a vigilância da localização:", error);
      }
    }
    startLocationWatch();

    return () => {
      stopLocationUpdatesAsync();
    };
  }, []);

  async function handleLocationUpdate(locationAsync) {
    if (!kiddo || !locationAsync || !locationAsync.coords) {
      return;
    }

    // Obtém a última localização salva na base de dados
    const kiddoId = kiddo?._id; // As vezes aqui vem undefined
    const device = Tracker.DEVICE_ID;

    const lastLocation = await getLastLocation(kiddoId, device);

    if (lastLocation) {
      const geoInput = {
        latitude: parseFloat(lastLocation.latitude),
        longitude: parseFloat(lastLocation.longitude),
      };
      const geoOutput = {
        latitude: locationAsync.coords.latitude,
        longitude: locationAsync.coords.longitude,
      };
      // Calcula a distância entre a localização atual e a última localização salva
      const distance = getDistance(geoInput, geoOutput, 1);

      if (distance >= 1000) {
        //VERIFICAR A DISTANCIA A CADA LOCALIZAÇÃO SALVA
        // Salva a nova localização na base de dados
        try {
          await saveLocation(
            locationAsync.coords.latitude,
            locationAsync.coords.longitude,
            kiddoId,
            device,
            locationAsync.timestamp
          );
          console.log("Localização salva com sucesso.");
        } catch (error) {
          console.error("Erro ao salvar localização:", error);
        }
      } else {
        console.log(
          "Distância menor que 50 metros. Não é necessário salvar a localização."
        );
      }
    } else {
      // Se não houver localização anterior, salva a localização atual
      try {
        await saveLocation(
          locationAsync.coords.latitude,
          locationAsync.coords.longitude,
          kiddoId,
          device,
          locationAsync.timestamp //tempo que pega a localização
        );
        console.log("Localização inicial salva com sucesso.");
      } catch (error) {
        console.error("Erro ao salvar localização inicial:", error);
      }
    }
  }

  return (
    <View style={styles.mapContainer}>
      {location && !loadingMap ? (
        <>
          <View style={styles.buttonMapConfigContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              activeOpacity={0.7}
              onPress={toggleSetMapType}
            >
              <FontAwesome
                name="map"
                color={defaultStyle.colors.mainColorBlue}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton} activeOpacity={0.7}>
              <FontAwesome
                name="location-arrow"
                color={defaultStyle.colors.mainColorBlue}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              // pitch: 45, // Inclinação da câmera em graus (0 é vista de cima)
              // heading: 90, // Direção da câmera em graus em relação ao norte
            }}
            onMapReady={() => {
              // Centralize a câmera no marcador e ajuste o zoom para incluir o marcador na visualização
              mapRef.current?.fitToCoordinates([location], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              });
            }}
            mapType={mapType} //Mudar dinamicamente em função ao Mapa Principal
            initialCamera={{
              pitch: 45, // Inclinação da câmera em graus (0 é vista de cima)
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              heading: location.coords.heading, // Direção da câmera em graus em relação ao norte
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={kiddo?.surname}
              description="Última Localização Registada"
            />
          </MapView>
        </>
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
  );
};

export default Map;
