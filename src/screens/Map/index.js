import React from "react";
import { View, Text } from "react-native";

const Map = () => {
  const [location, setLocation] = useState(null);

  const requestPermission = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        console.log(currentPosition);
        setLocation(currentPosition);
      } else {
        Alert.alert("Erro", "Permissão não concedida");
      }
    } catch (error) {
      console.log("Erro ao Pedir permissão de Localização", error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        mapType="satellite"
        initialRegion={{
          //Mostrar Ultima Localização da DB
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;
