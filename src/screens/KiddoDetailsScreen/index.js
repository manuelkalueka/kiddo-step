import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

const KiddoDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <View style={styles.detailContainer}>
          <View>
            <Image
              source={require("./../../../assets/img/boy-avatar.png")}
              style={styles.kiddoImg}
            />
            <TouchableOpacity style={styles.buttonChangeImg}>
              <Entypo
                name="camera"
                size={18}
                color={defaultStyle.colors.blueLightColor1}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.headerSurname}>Tiagão</Text>
              <Text style={styles.headerAge}>5 anos</Text>
            </View>
            <TouchableOpacity style={styles.buttonMapContainer}>
              <Entypo
                name="map"
                size={25}
                color={defaultStyle.colors.blueLightColor1}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KiddoDetailsScreen;
