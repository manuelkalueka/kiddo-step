import React, { useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { relativeTime, formatDate } from "../../utils/format-date";
import ActionButtom from "../../components/ActionButtom";
import styles from "./styles";

const HISTORICO_BRUTO = [
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
  {
    title: "Meu Histórico",
    date: new Date(),
    content: "Conteúdo do histórico",
  },
];

function LocationHistoryScreen() {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={HISTORICO_BRUTO}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onLongPress={() =>
              Alert.alert("FUNCIONALIDADE", "Ocultar Histórico")
            }
            activeOpacity={0.6}
            onPress={openBottomSheet}
          >
            <View style={styles.item}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.date}>{relativeTime(item.date)}</Text>
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
          </TouchableOpacity>
        )}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // comeca fechado
        snapPoints={[1, "25%", "50%", "100%"]}
        handleIndicatorStyle={{
          backgroundColor: defaultStyle.colors.mainColorBlue,
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
        <BottomSheetScrollView
          style={styles.containerSheet}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainDetailHeader}>
            Detalhes do [NOME DA ATIVIDADE]
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Data e Hora</Text>
            <Text style={styles.detailContent}>
              Data da Localização: {formatDate(Date.now())}
            </Text>
            <Text style={styles.detailContent}>
              Hora da Localização: (hora, minuto, segundo)
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Localização</Text>
            <Text style={styles.detailContent}>
              Endereço Completo: (rua, número, bairro, cidade, estado, país)
            </Text>
            <Text style={styles.detailContent}>
              Latitude e Longitude: (coordenadas geográficas)
            </Text>
            <Text style={styles.detailContent}>
              Nome do Local: (se disponível, como um ponto de referência)
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>Outras Informações</Text>
            <Text style={styles.detailContent}>
              Tipo de Localização: (GPS, Wi-Fi, etc.)
            </Text>
            <Text style={styles.detailContent}>
              Área: [SEGURA, NÃO DEFINIDA, INSEGURA]
            </Text>
          </View>
          <ActionButtom
            textButton="Ver no Mapa"
            onPress={() => {
              navigation.navigate("Mapa");
              closeBottomSheet();
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(LocationHistoryScreen); //Habilita Gestos no Android e melhora a compatibilidade no IOS
