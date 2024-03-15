import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";

import styles from "./styles";
import { formatDate } from "../../utils/format-date";

import { AntDesign } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

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
export default function LocationHistoryScreen() {
  const modalizeRef = useRef(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={HISTORICO_BRUTO}
        keyExtractor={(item, index) => new Date().getTime() + item + index}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onLongPress={() =>
              Alert.alert("FUNCIONALIDADE", "Ocultar do Histórico")
            }
          >
            <View style={styles.item}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.itemAction}
                onPress={openModalize}
              >
                <Text style={styles.textAction}>Detalhes</Text>
                <AntDesign
                  name="right"
                  size={defaultStyle.sizes.inputText}
                  color={defaultStyle.colors.mainColorBlue}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />

      <Modalize ref={modalizeRef} snapPoint={180} modalHeight={200}
      HeaderComponent={
        <View>
          <Text>TITULO DO EVENTO</Text>
        </View>
      }>
        <View
          style={{
            flex: 1,
            height: 180,
          }}
        >
          <Text>Sou o Conteudo</Text>
        </View>
      </Modalize>
    </View>
  );
}
