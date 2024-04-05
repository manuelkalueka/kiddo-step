import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

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

  return (
    <View style={styles.container}>
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
  );
}
