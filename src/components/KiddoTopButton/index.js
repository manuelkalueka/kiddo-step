import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

// import { Container } from './styles';
const kiddoAvatar = require("./../../../assets/img/boy-avatar.png");
const KiddoTopButton = () => {
  return (
    <TouchableOpacity
      // Estudar a biblioteca para renderizar correctamente botões no Header [React-native navigation]

      style={styles.container}
      onPress={() => {
        handleKiddoModalOpen();
      }}
    >
      <View>
        <Image source={kiddoAvatar} style={styles.kiddoImg} />
      </View>
      <Text style={styles.textSurname}>Tiagão</Text>
    </TouchableOpacity>
  );
};

export default KiddoTopButton;
