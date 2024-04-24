import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import getDistance from "geolib/es/getDistance";
import { useAuth } from "../../contexts/auth";
import { getLastLocation, saveLocation } from "../../services/location-service";
import { getKiddoInfo } from "../../services/kiddo-service";
import { Tracker } from "../../../tracker-data";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const [kiddo, setKiddo] = useState(null);
  const [mapType, setMapType] = useState("standard");

  async function toggleSetMapType() {
    if (mapType === "standard") {
      setMapType("hybrid");
    } else if (mapType === "hybrid") {
      setMapType("standard");
    }
    await AsyncStorage.setItem("@MapType", mapType);
  }

  const { user } = useAuth();
  const mapRef = useRef();

  async function requestLocationPermissions() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const currentLocation = await Location.getCurrentPositionAsync();
        setLocation(currentLocation);
      } else {
        console.log(
          "Permissão de localização negada",
          "O aplicativo precisa de permissão de localização para funcionar corretamente."
        );
      }
    } catch (error) {
      console.error("Erro ao obter permissões de localização:", error);
    }
  }

  async function getKiddoOn() {
    const kiddoTemp = await getKiddoInfo(user);
    setKiddo(kiddoTemp);
  }

  useEffect(() => {
    getKiddoOn();
  }, [user]);

  useEffect(() => {
    getKiddoOn();
  }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    async function startLocationWatch() {
      try {
        await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
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

    async function handleLocationUpdate(locationAsync) {
      // Obtém a última localização salva na base de dados
      const kiddoId = kiddo?._id;
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

    startLocationWatch();

    return () => {
      Location.stopLocationUpdatesAsync();
    };
  }, []);

  return (
    <View style={styles.mapContainer}>
      {location && !loadingMap ? (
        <>
          <View style={styles.buttonMapConfigContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={toggleSetMapType}
            >
              <FontAwesome
                name="map"
                color={defaultStyle.colors.mainColorBlue}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton}>
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
              <Marker
                coordinate={markerPosition}
                title={kiddo?.surname}
                description="Última Localização Registada"
              />
            )}
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
