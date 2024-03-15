import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler"; //Gerenciador de Gestos no Mobile
import styles from "./styles";
import { relativeTime, formatDate } from "../../utils/format-date";

import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

const { width, height } = Dimensions.get("window");

const HISTORICO_BRUTO = [
  {
    title: "Meu Historico",
    date: new Date().getDate() + 1,
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date().getDate(),
    content: "Conteudo do historico",
  },
];
function LocationHistoryScreen() {
  const bottomSheetRef = useRef(null);
  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={HISTORICO_BRUTO}
        keyExtractor={(item, index) => new Date().getTime() + item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onLongPress={() =>
              Alert.alert("FUNCIONALIDADE", "Ocultar do Histórico")
            }
            activeOpacity={0.6}
          >
            <View style={styles.item}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.date}>{relativeTime(item.date)}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.itemAction}
                onPress={openBottomSheet}
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
      <BottomSheet //Modal Para Mostrar os Detalhes da Actividade
        ref={bottomSheetRef}
        index={0} //começa fechado
        snapPoints={[1, height - 160, height - 340]}
        handleIndicatorStyle={{
          backgroundColor: defaultStyle.colors.mainColorBlue,
        }}
        backgroundStyle={{
          backgroundColor: defaultStyle.colors.white,
        }}
      >
        <BottomSheetView style={styles.containerSheet}>
          <View>
            <Text style={styles.header}>Detalhes do [NOME DA ACTIVIDADE]</Text>
          </View>
          <View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Data e Hora</Text>
              <Text  style={styles.detailContent}>
                Data da Localização {formatDate(new Date().getDate())}
              </Text>
              <Text  style={styles.detailContent}>Hora da localização (hora, minuto, segundo).</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Localização</Text>
              <Text style={styles.detailContent}>
                Endereço completo (rua, número, bairro, cidade, estado, país).
              </Text>
              <Text  style={styles.detailContent}>Latitude e longitude (coordenadas geográficas).</Text>
              <Text  style={styles.detailContent}>
                Nome do local (se disponível, como um ponto de referência).
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Outras Informações</Text>
              <Text  style={styles.detailContent}>Tipo de localização (GPS, Wi-Fi, etc.).</Text>
              <Text  style={styles.detailContent}>Área [SEGURA, NAO DEFINA, INSEGURA]</Text>
            </View>

            <TouchableOpacity>
              <Text>Ver No Mapa</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
