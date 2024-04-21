import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import getDistance from "geolib/es/getDistance";
import { useAuth } from "../../contexts/auth";
import { getLastLocation, saveLocation } from "../../services/location-service";
import { Tracker } from "../../../tracker-data";

import { useKiddo } from "../../contexts/kiddo";

const Map = () => {
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const { kiddo } = useKiddo();

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
          }
        );
      } catch (error) {
        console.error("Erro ao iniciar a vigilância da localização:", error);
      }
    }
    startLocationWatch();

    return () => {
      Location.stopLocationUpdatesAsync();
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
    <View>
      <Text>Sou a Tela de Mapa</Text>
    </View>
  );
};

export default Map;
