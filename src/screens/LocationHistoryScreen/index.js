import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { reverseGeocodeAsync } from "expo-location";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { relativeTime, formatDate, getHour } from "../../../utils/format-date";
import ActionButtom from "../../components/ActionButtom";
import styles from "./styles";
import {
  getCurrentLocation,
  getLocationHistory,
} from "../../services/location-service";
import { getKiddo } from "../../services/kiddo-service";

const LocationHistoryScreen = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const [locationHistory, setLocationHistory] = useState(null);
  const [locationItem, setLocationItem] = useState(null);
  const [loading, setLoading] = useState(true);
  let coordenadas = {};
  if (locationItem) {
    const { latitude, longitude } = locationItem;

    coordenadas = {
      latitude,
      longitude,
    };
  }

  async function revGeoCode(latitude, longitude) {
    const place = await reverseGeocodeAsync({ latitude, longitude });
    return place;
  }

  async function openBottomSheet(id) {
    const locItem = await getLocationItem(id);
    const place = await revGeoCode(locItem.latitude, locItem.longitude);
    locItem.place = place[0];
    setLocationItem(locItem);
    console.log(locationItem.place.name);
    bottomSheetRef.current?.expand();
    setLoading(false);
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    navigation.navigate("Mapa", {
      coordenadas,
    });
  }

  async function getLocationItem(id) {
    try {
      const location = await getCurrentLocation(id);
      return location;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getLocHistory() {
      try {
        const kiddo = getKiddo();
        const locHistory = await getLocationHistory(kiddo, "1245");
        setLocationHistory(locHistory);
      } catch (error) {
        console.log(error);
      }
    }

    getLocHistory();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locationHistory}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          locationHistory ? (
            <TouchableOpacity
              style={styles.itemContainer}
              onLongPress={() =>
                Alert.alert("FUNCIONALIDADE", "Ocultar Histórico")
              }
              activeOpacity={0.8}
            >
              <View style={styles.item}>
                <Text style={styles.header}>
                  {item.address
                    ? item.address.country
                    : `Movimento ${item.latitude.toFixed(4)}`}
                </Text>
                <Text style={styles.date}>{relativeTime(item?.timestamp)}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.itemAction}
                  onPress={() => openBottomSheet(item._id)}
                >
                  <Text style={styles.textAction}>
                    {/* {loading ? (
                      <ActivityIndicator
                        size={"small"}
                        color={defaultStyle.colors.mainColorBlue}
                      />
                    ) : ( */}
                    Detalhes
                    {/* )} */}
                  </Text>
                  <AntDesign
                    name="right"
                    size={defaultStyle.sizes.inputText}
                    color={defaultStyle.colors.mainColorBlue}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={{ justifyContent: "center", alignItems: "center" }}>
              Sem Histórico Disponível
            </Text>
          )
        }
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // começa fechado
        snapPoints={[1, "25%", "50%", "100%"]}
        handleIndicatorStyle={{
          backgroundColor: defaultStyle.colors.mainColorBlue,
        }}
      >
        <BottomSheetScrollView
          style={styles.containerSheet}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainDetailHeader}>
            Detalhes de{" "}
            {locationItem?.place?.name !== null
              ? `${locationItem?.place?.name} em ${locationItem?.place?.city}` ===
                null
                ? ""
                : `${locationItem?.place?.city}`
              : "Movimento"}
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Data e Hora</Text>
            <Text style={styles.detailContent}>
              Data da Localização: {formatDate(locationItem?.timestamp)}
            </Text>
            <Text style={styles.detailContent}>
              Hora da Localização: {getHour(locationItem?.timestamp)}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Localização</Text>
            <Text style={styles.detailContent}>
              Endereço Completo:{" "}
              {locationItem?.city !== null
                ? `${locationItem?.name}, ${locationItem?.street}, ${locationItem?.city},${locationItem?.country}`
                : "Inválido!"}
            </Text>
            <Text style={styles.detailContent}>
              Latitude e Longitude: {locationItem?.latitude.toFixed(4)},{" "}
              {locationItem?.longitude.toFixed(4)}
            </Text>
            <Text style={styles.detailContent}>
              Nome do Local:{" "}
              {locationItem?.name !== null ? locationItem?.name : "Inválido!"}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Outras Informações</Text>
            <Text style={styles.detailContent}>
              Tipo de Localização: {locationItem?.type.toUpperCase()}
            </Text>
            <Text style={styles.detailContent}>
              {/* Área: [SEGURA, NÃO DEFINIDA, INSEGURA] */}
              Área: NÃO DEFINIDA
            </Text>
          </View>
          <ActionButtom
            textButton="Ver no Mapa"
            onPress={() => {
              closeBottomSheet();
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
