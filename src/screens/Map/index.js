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
        mapRef.current?.animateCamera({
          //Camera do Mapa
          pitch: 70,
          center: response.coords,
        });
      }
    );
  }, []);

  const PLACES = [
    {
      id: 1,
      nome: "Times Square",
      latitude: 40.758,
      longitude: -73.9855,
    },
    {
      id: 2,
      nome: "Grand Canyon",
      latitude: 36.1069,
      longitude: -112.1129,
    },
    {
      id: 3,
      nome: "Golden Gate Bridge",
      latitude: 37.8199,
      longitude: -122.4783,
    },
    {
      id: 4,
      nome: "Yellowstone National Park",
      latitude: 44.4279,
      longitude: -110.5885,
    },
    {
      id: 5,
      nome: "Niagara Falls",
      latitude: 43.0962,
      longitude: -79.0377,
    },
    {
      id: 6,
      nome: "Statue of Liberty",
      latitude: 40.6892,
      longitude: -74.0445,
    },
    {
      id: 7,
      nome: "Mount Rushmore",
      latitude: 43.8791,
      longitude: -103.4591,
    },
    {
      id: 8,
      nome: "Yosemite National Park",
      latitude: 37.8651,
      longitude: -119.5383,
    },
    {
      id: 9,
      nome: "White House",
      latitude: 38.8977,
      longitude: -77.0366,
    },
    {
      id: 10,
      nome: "Disneyland",
      latitude: 33.8121,
      longitude: -117.919,
    },
    {
      id: 11,
      nome: "Mount Hood",
      latitude: 45.3735,
      longitude: -121.6959,
    },
    {
      id: 12,
      nome: "Rocky Mountains",
      latitude: 39.5501,
      longitude: -105.7821,
    },
    {
      id: 13,
      nome: "Everglades National Park",
      latitude: 25.2866,
      longitude: -80.8987,
    },
    {
      id: 14,
      nome: "Alcatraz Island",
      latitude: 37.8267,
      longitude: -122.4233,
    },
    {
      id: 15,
      nome: "Mount Rainier",
      latitude: 46.8523,
      longitude: -121.7603,
    },
    {
      id: 16,
      nome: "Hollywood Walk of Fame",
      latitude: 34.1018,
      longitude: -118.341,
    },
    {
      id: 17,
      nome: "Great Smoky Mountains National Park",
      latitude: 35.6532,
      longitude: -83.507,
    },
    {
      id: 18,
      nome: "Las Vegas Strip",
      latitude: 36.1147,
      longitude: -115.1728,
    },
    {
      id: 19,
      nome: "Kennedy Space Center",
      latitude: 28.5721,
      longitude: -80.648,
    },
    {
      id: 20,
      nome: "Death Valley National Park",
      latitude: 36.5054,
      longitude: -117.0794,
    },
    {
      id: 21,
      nome: "Yellowstone Lake",
      latitude: 44.4279,
      longitude: -110.5885,
    },
    {
      id: 22,
      nome: "Independence Hall",
      latitude: 39.9489,
      longitude: -75.1504,
    },
    {
      id: 23,
      nome: "Redwood National and State Parks",
      latitude: 41.2132,
      longitude: -124.0046,
    },
    {
      id: 24,
      nome: "Zion National Park",
      latitude: 37.2982,
      longitude: -113.0263,
    },
    {
      id: 25,
      nome: "Great Wall of Los Angeles",
      latitude: 34.1784,
      longitude: -118.4481,
    },
    {
      id: 26,
      nome: "Cape Canaveral",
      latitude: 28.3922,
      longitude: -80.6077,
    },
    {
      id: 27,
      nome: "Golden Gate Park",
      latitude: 37.7694,
      longitude: -122.4862,
    },
    {
      id: 28,
      nome: "Mount St. Helens",
      latitude: 46.1912,
      longitude: -122.1944,
    },
    {
      id: 29,
      nome: "Smithsonian National Air and Space Museum",
      latitude: 38.8886,
      longitude: -77.0229,
    },
    {
      id: 30,
      nome: "Griffith Observatory",
      latitude: 34.1184,
      longitude: -118.3004,
    },
    {
      id: 31,
      nome: "Garden of the Gods",
      latitude: 38.8785,
      longitude: -104.869,
    },
    {
      id: 32,
      nome: "Boston Harbor",
      latitude: 42.3601,
      longitude: -71.0589,
    },
    {
      id: 33,
      nome: "Hoover Dam",
      latitude: 36.0158,
      longitude: -114.7379,
    },
    {
      id: 34,
      nome: "Yellowstone River",
      latitude: 44.6303,
      longitude: -110.786,
    },
    {
      id: 35,
      nome: "San Francisco Bay",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 36,
      nome: "Mount McKinley",
      latitude: 63.0695,
      longitude: -151.007,
    },
  ];

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  return (
    <View style={styles.container}>
      {location && ( //Verifica se tem localiza e chama o mapa
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
