import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
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

  function openBottomSheet(id) {
    const locItem = getLocationItem(id);
    setLocationItem(locItem);
    bottomSheetRef.current?.expand();
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

  const [locationHistory, setLocationHistory] = useState([]);
  const [locationItem, setLocationItem] = useState({});

  const { latitude, longitude } = locationItem;

  const coordenadas = {
    latitude,
    longitude,
  };

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
        keyExtractor={({ index }) => index}
        renderItem={({ item }) => {
          <TouchableOpacity
            style={styles.itemContainer}
            onLongPress={() =>
              Alert.alert("FUNCIONALIDADE", "Ocultar Histórico")
            }
            activeOpacity={0.6}
            onPress={() => openBottomSheet(item._id)}
          >
            <View style={styles.item}>
              <Text style={styles.header}>
                {item.address ? item.address.country : "Movimento"}
              </Text>
              <Text style={styles.date}>{relativeTime(item?.timestamp)}</Text>
            </View>
            <View>
              <View style={styles.itemAction}>
                <Text style={styles.textAction}>Detalhes</Text>
                <AntDesign
                  name="right"
                  size={defaultStyle.sizes.inputText}
                  color={defaultStyle.colors.mainColorBlue}
                />
              </View>
            </View>
          </TouchableOpacity>;
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // comeca fechado
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
            {locationItem?.address
              ? locationItem?.address.country
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
              Endereço Completo: {locationItem?.display_name}
            </Text>
            <Text style={styles.detailContent}>
              Latitude e Longitude: "", {locationItem?.longitude}
            </Text>
            <Text style={styles.detailContent}>
              Nome do Local: {locationItem?.display_name}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Outras Informações</Text>
            <Text style={styles.detailContent}>
              Tipo de Localização: {locationItem?.type}
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
