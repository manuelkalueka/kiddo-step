import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

import LoadingComponent from "../../components/LoadingComponent";

import { formatDate } from "../../../utils/format-date";

import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "./styles";
import defaultStyle from "../../defaultStyle";
import { listAlertsService } from "../../services/alert-service";

export default function AlertScreen() {
  const [colorIcon, setColorIcon] = useState("#ff6f48");
  const [data, setData] = useState([]);
  const [lodadingAlert, setLoadingAlert] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAlerts();
      setRefreshing(false);
    }, 2000);
  }, []);

  async function getAlerts() {
    const geoFecingId = "662e46543fa5166d5e52a999"; //Tornar Dinamico

    listAlertsService(geoFecingId) //Ajustar a chamada
      .then((res) => {
        setData(res);
        setLoadingAlert(false);
      })
      .catch((error) => console.log("Erro ao buscar alertas", error));
  }

  useEffect(() => {
    getAlerts();
  }, []);

  const handlerMarkAll = () => {
    setColorIcon("#f5f5f5");
  };

  return lodadingAlert ? (
    <LoadingComponent />
  ) : (
    <View style={styles.container}>
      {data == "" ? (
        <View style={styles.containerNo}>
          <Text style={styles.titleContainerNo}> Sem alertas disponíveis </Text>
        </View>
      ) : (
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.btnMarkAll}
            onPress={() => handlerMarkAll()}
          >
            <Text style={styles.textBtnMark}>Marcar todas como lidas</Text>
          </TouchableOpacity>

          <FlatList
            style={styles.containerNoti}
            data={data}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.containerItens}>
                <View style={styles.containerIcon}>
                  <FontAwesome5
                    name="bell"
                    size={25}
                    color={defaultStyle.colors.defaultIcon}
                  />
                </View>

                <TouchableOpacity style={styles.containerItem}>
                  <Text style={styles.itemDate}>
                    {formatDate(item.createdAt)}
                  </Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubject}>{item.type}</Text>

                  <FontAwesome5
                    name="check-circle"
                    size={12}
                    color={colorIcon}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
