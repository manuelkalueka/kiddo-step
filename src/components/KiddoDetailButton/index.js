import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const KiddoDetailButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("KiddoDetails");
      }}
    >
      <View>
        <Image
          source={require("./../../../assets/img/boy-avatar.png")}
          style={styles.kiddoImg}
        />
      </View>
    </TouchableOpacity>
  );
};

export default KiddoDetailButton;
