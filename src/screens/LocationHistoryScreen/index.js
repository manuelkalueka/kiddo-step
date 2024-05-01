import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
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
import { Tracker } from "../../../tracker-data";
import { FontAwesome } from "@expo/vector-icons";

import { useKiddo } from "../../contexts/kiddo";
import LoadingComponent from "../../components/LoadingComponent";

const LocationHistoryScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const { kiddo } = useKiddo();

  const [locationHistory, setLocationHistory] = useState([]);
  const [locationItem, setLocationItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getLocHistory();
      setRefreshing(false);
    }, 2000);
  }, []);

  async function getLocHistory() {
    try {
      const kiddoId = kiddo._id;
      const device = Tracker.DEVICE_ID;
      const locHistory = await getLocationHistory(kiddoId, device);
      setLocationHistory(locHistory);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar histórico de localiação", error);
    }
  }

  useEffect(() => {
    getLocHistory();
  }, []);

  //Pede Latitude e Longitude e retorna a Localidade tal como conhecemos
  async function revGeoCode(latitude, longitude) {
    try {
      const place = await reverseGeocodeAsync({ latitude, longitude });
      return place;
    } catch (error) {
      console.log("Erro ao reverter localização para endereço ", error);
    }
  }

  async function openBottomSheet(id) {
    try {
      const locItem = await getLocationItem(id); //guarda o item para visualizar
      // const place = await revGeoCode(locItem.latitude, locItem.longitude); //Verificar o desempenho nessa chamada por causa da API do Location
      // locItem.place = place[0];

      setLocationItem(locItem);
      setLoading(false);
      bottomSheetRef.current?.expand();
    } catch (error) {
      console.log(
        "Erro ao carregar localização especifica abrindo o sheet ",
        error
      );
    }
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    navigation.navigate("Mapa", {
      coordenadas,
    });
    console.log("Vendo as Coordenas que vai para o MAPA, ", coordenadas);
  }

  async function getLocationItem(id) {
    try {
      const location = await getCurrentLocation(id);
      return location;
    } catch (error) {
      console.log("Erro ao buscar localização especifica", error);
    }
  }

  let coordenadas = {};
  if (locationItem) {
    const { latitude, longitude } = locationItem;
    coordenadas = {
      latitude,
      longitude,
    };
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingComponent />
      ) : locationHistory === null || locationHistory.length === 0 ? (
        <View style={styles.containerEmpty}>
          <FontAwesome
            name="calendar-times-o"
            color={defaultStyle.colors.mainColorBlue}
            size={40}
          />

          <Text style={styles.textEmpty}>Sem Histórico Disponível</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={locationHistory}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onLongPress={() =>
                  Alert.alert("FUNCIONALIDADE FUTURA", "Ocultar Histórico")
                }
                activeOpacity={0.8}
              >
                <View style={styles.item}>
                  <Text style={styles.header}>
                    {item.place !== null && item.place !== undefined
                      ? `${kiddo?.surname} em ${item.place.country} - ${item.place.city}`
                      : `Movimento de ${kiddo?.surname} ${item.latitude.toFixed(
                          4
                        )}`}
                  </Text>
                  <Text style={styles.date}>
                    {relativeTime(item?.timestamp)}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.itemAction}
                    onPress={() => openBottomSheet(item._id)}
                  >
                    <Text style={styles.textAction}>Detalhes</Text>
                    <AntDesign
                      name="right"
                      size={defaultStyle.sizes.inputText}
                      color={defaultStyle.colors.mainColorBlue}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />

          <BottomSheet
            ref={bottomSheetRef}
            index={0} // começa fechado
            snapPoints={[1, "25%", "50%", "90%"]}
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
                {locationItem?.place?.name !== null &&
                locationItem?.place?.name !== undefined
                  ? `${locationItem?.place?.name} em ${locationItem?.place?.city}` ===
                    null
                    ? ""
                    : `${locationItem?.place?.city}`
                  : `Movimento ${locationItem?.latitude?.toFixed(4)}`}
              </Text>
              <View style={styles.detailContainer}>
                <Text style={styles.detailHeader}>Data e Hora</Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Data da Localização:</Text>{" "}
                  {formatDate(locationItem?.timestamp)}
                </Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Hora da Localização:</Text>{" "}
                  {getHour(locationItem?.timestamp)}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailHeader}>Localização</Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Endereço Completo:</Text>{" "}
                  {locationItem?.city !== null &&
                  locationItem?.city !== undefined
                    ? `${locationItem?.name}, ${locationItem?.street}, ${locationItem?.city},${locationItem?.country}`
                    : "DESCONHECIDO"}
                </Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Latitude e Longitude:</Text>{" "}
                  {locationItem?.latitude?.toFixed(4)},{" "}
                  {locationItem?.longitude?.toFixed(4)}
                </Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Nome do Local:</Text>{" "}
                  {locationItem?.name !== null &&
                  locationItem?.name !== undefined
                    ? locationItem?.name
                    : "DESCONHECIDO"}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailHeader}>Outras Informações</Text>
                <Text style={styles.detailContent}>
                  <Text style={styles.labelContent}>Tipo de Localização:</Text>{" "}
                  {locationItem?.type?.toUpperCase()}
                </Text>
                <Text style={styles.detailContent}>
                  {/* Área: [SEGURA, NÃO DEFINIDA, INSEGURA] */}
                  <Text style={styles.labelContent}>Área:</Text> NÃO DEFINIDA
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
        </>
      )}
    </View>
  );
};

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
