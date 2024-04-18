import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
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
import { getKiddoInfo } from "../../services/kiddo-service";
import { useAuth } from "../../contexts/auth";
import { Tracker } from "../../../tracker-data";

const LocationHistoryScreen = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const [locationHistory, setLocationHistory] = useState(null);
  const [locationItem, setLocationItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kiddo, setKiddo] = useState(null);

  const [visibleModalDetail, setVisibleModalDetail] = useState(false);

  let coordenadas = {};
  if (locationItem) {
    const { latitude, longitude } = locationItem;

    coordenadas = {
      latitude,
      longitude,
    };
  }

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
      const place = await revGeoCode(locItem.latitude, locItem.longitude); //Verificar o desempenho nessa chamada por causa da API do Location
      locItem.place = place[0];
      setLocationItem(locItem);
      setLoading(false);
      bottomSheetRef.current?.expand();
    } catch (error) {
      console.log("Erro ao carregar localização especifica ", error);
    }
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
  const { user } = useAuth();
  useEffect(() => {
    async function getLocHistory() {
      try {
        const kiddoData = await getKiddoInfo(user);
        const kiddo = kiddoData._id;
        const device = Tracker.DEVICE_NAME;
        const locHistory = await getLocationHistory(kiddo, device);
        setLocationHistory(locHistory);
      } catch (error) {
        console.log(error);
      }
    }

    getLocHistory();
  }, []);

  async function handleOpenModalDetail(id) {
    try {
      await openBottomSheet(id);
      setVisibleModalDetail(true);
    } catch (error) {
      console.log("Erro ao Abrir o Modal", error);
    }
  }

  function handleCloseModalDetail() {
    setVisibleModalDetail(false);
  }

  useEffect(() => {
    async function getKiddo() {
      const newKiddo = await getKiddoInfo(user);
      setKiddo(newKiddo);
    }
    getKiddo();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locationHistory}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          locationHistory.length ? (
            <TouchableOpacity
              style={styles.itemContainer}
              onLongPress={() =>
                Alert.alert("FUNCIONALIDADE", "Ocultar Histórico")
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

      {/* <Modal
        transparent={true}
        visible={visibleModalDetail}
        onRequestClose={handleCloseModalDetail}
        onDismiss={handleCloseModalDetail}
        statusBarTranslucent={true}
      > */}
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
              : `Movimento ${locationItem?.latitude.toFixed(4)}`}
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
              {locationItem?.city !== null && locationItem?.city !== undefined
                ? `${locationItem?.name}, ${locationItem?.street}, ${locationItem?.city},${locationItem?.country}`
                : "DESCONHECIDO"}
            </Text>
            <Text style={styles.detailContent}>
              <Text style={styles.labelContent}>Latitude e Longitude:</Text>{" "}
              {locationItem?.latitude.toFixed(4)},{" "}
              {locationItem?.longitude.toFixed(4)}
            </Text>
            <Text style={styles.detailContent}>
              <Text style={styles.labelContent}>Nome do Local:</Text>{" "}
              {locationItem?.name !== null && locationItem?.name !== undefined
                ? locationItem?.name
                : "DESCONHECIDO"}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Outras Informações</Text>
            <Text style={styles.detailContent}>
              <Text style={styles.labelContent}>Tipo de Localização:</Text>{" "}
              {locationItem?.type.toUpperCase()}
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
    </View>
  );
};

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
