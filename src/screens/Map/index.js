import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location"; // localização

import styles from "./styles";

export default function Map() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); //Referencia do Mapa na Tela

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    //Pedir Permissão ao Abrir o APP
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      //Vigia a Localização do Dispositivo
      {
        accuracy: LocationAccuracy.Highest, //Precisão da Localização
        timeInterval: 1000, //intervalo de Actualização
        distanceInterval: 1, //Pesquisar estaaa
      },
      (response) => {
        //Recebe a localização e Actualiza
        setLocation(response);
        const { latitude, longitude } = response.coords;
        mapRef.current?.animateCamera({
          //Camera do Mapa
          pitch: 70,
          center: {
            latitude,
            longitude,
          },
          pitch: 70,
          heading: response.coords.heading,
        });
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {location && ( //Verifica se tem localiza e chama o mapa
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
          // (Tipos de Mapa)
          mapType="hybrid"
          //Botão de Mostrar Localização do Usuário apenas com Google Maps ou Android
          showsMyLocationButton={true}
        >
          <Marker // Pin da Localização
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
}
