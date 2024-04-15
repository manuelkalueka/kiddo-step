import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import geolib from "geolib";
import { useAuth } from "../../contexts/auth";
import { getLastLocation, saveLocation } from "../../services/location-service";

const Map = () => {
  const [location, setLocation] = useState(null);
  async function requestLocationPermissions() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await Location.getCurrentPositionAsync();
        console.log(currentPosition);
      } else {
        console.log(
          "Permissão de localização negada",
          "O aplicativo precisa de permissão de localização para funcionar corretamente."
        );
      }
    } catch (error) {
      console.error("Erro ao obter permissões de localização:", error);
      console.log(
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
        await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 10, //distancia de 10 metros
          },
          (response) => {
            setLocation(response);
            handleLocationUpdate(response);
          }
        );
      } catch (error) {
        console.error("Erro ao iniciar a vigilância da localização:", error);
        console.log(
          "Erro",
          "Ocorreu um erro ao iniciar a vigilância da localização."
        );
      }
      // Função para lidar com a atualização da localização do usuário
      const handleLocationUpdate = async (location) => {
        // Obtém a última localização salva na base de dados
        const kiddo = auth.user._id;
        const device = 4321;

        const lastLocation = await getLastLocation(kiddo, device);
        if (lastLocation) {
          // Calcula a distância entre a localização atual e a última localização salva
          const distance = geolib.getDistance(
            {
              latitude: lastLocation.latitude,
              longitude: lastLocation.longitude,
            },
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          );
          // Verifica se a distância percorrida é maior ou igual a 50 metros
          if (distance >= 50) {
            // Salva a nova localização na base de dados
            try {
              await saveLocation(
                location.coords.latitude,
                location.coords.longitude,
                kiddo,
                device
              );
              console.log("Localização salva com sucesso.");
            } catch (error) {
              console.error("Erro ao salvar localização:", error);
            }
          }
        } else {
          // Se não houver localização anterior, salva a localização atual
          try {
            await saveLocation(
              location.coords.latitude,
              location.coords.longitude,
              kiddo,
              device
            );
            console.log("Localização inicial salva com sucesso.");
          } catch (error) {
            console.error("Erro ao salvar localização inicial:", error);
          }
        }
      };
      // Limpa a observação ao desmontar o componente
      return () => {
        Location.stopLocationUpdatesAsync();
      };
    }

    startLocationWatch();
  }, []);

  const auth = useAuth();

  return (
    <View>
      <Text>Rastreador de Localização</Text>
    </View>
  );
};
export default Map;
