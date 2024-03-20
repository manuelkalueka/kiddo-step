import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";

import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

import { useNavigation } from "@react-navigation/native";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { gestureHandlerRootHOC } from "react-native-gesture-handler"; //Gerenciador de Gestos no Mobile
import { relativeTime, formatDate } from "../../utils/format-date";

import ActionButtom from "../../components/ActionButtom";

const { width, height } = Dimensions.get("window");

const HISTORICO_BRUTO = [
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
  {
    title: "Meu Historico",
    date: new Date(),
    content: "Conteudo do historico",
  },
];
function LocationHistoryScreen() {
  const bottomSheetRef = useRef(null);

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* //ToDo -Verificar se tem notificação antes de rodar para mostrar */}
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
        snapPoints={[1, "100%", "50%"]}
        handleIndicatorStyle={{
          backgroundColor: defaultStyle.colors.mainColorBlue,
        }}
        backgroundStyle={{
          backgroundColor: defaultStyle.colors.white,
        }}
        style={{
          shadowColor: defaultStyle.colors.dark,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 1,
            height: 1,
          },
        }}
      >
        <BottomSheetView style={styles.containerSheet}>
          <View>
            <Text style={styles.mainDetailHeader}>
              Detalhes do [NOME DA ACTIVIDADE]
            </Text>
          </View>

          <View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Data e Hora</Text>
              <Text style={styles.detailContent}>
                Data da Localização {formatDate(Date.now())}
              </Text>
              <Text style={styles.detailContent}>
                Hora da localização (hora, minuto, segundo).
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Localização</Text>
              <Text style={styles.detailContent}>
                Endereço completo (rua, número, bairro, cidade, estado, país).
              </Text>
              <Text style={styles.detailContent}>
                Latitude e longitude (coordenadas geográficas).
              </Text>
              <Text style={styles.detailContent}>
                Nome do local (se disponível, como um ponto de referência).
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailHeader}>Outras Informações</Text>
              <Text style={styles.detailContent}>
                Tipo de localização (GPS, Wi-Fi, etc.).
              </Text>
              <Text style={styles.detailContent}>
                Área [SEGURA, NAO DEFINA, INSEGURA]
              </Text>
            </View>
            <ActionButtom
              textButton="Ver no Mapa"
              onPress={() => {
                navigation.navigate("Mapa");
                closeBottomSheet();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
