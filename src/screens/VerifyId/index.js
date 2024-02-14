import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

export default function VerifyId() {
  const [isSelectedModeEmail, setSelectedModeEmail] = useState(false);
  const [isSelectedModePhone, setSelectedModePhone] = useState(false);

  function handleVerifyModeEmail() {
    if (isSelectedModePhone) {
      setSelectedModeEmail(false);
    } else {
      setSelectedModeEmail(true);
    }

    console.log("Email\n", isSelectedModeEmail);
  }

  function handleVerifyModePhone() {
    if (isSelectedModeEmail) {
      setSelectedModePhone(false);
    } else {
      setSelectedModePhone(true);
    }
    console.log("Phone\n", isSelectedModePhone);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Verifica a tua identidade</Text>
        <Text style={styles.subtitle}>
          Sua identidade ajuda-nos a proteger o seu Kiddo
        </Text>
      </View>

      <View style={styles.pressContainer}>
        <Pressable
          style={
            isSelectedModeEmail
              ? [styles.pressItem, styles.pressItemSelected]
              : styles.pressItem
          }
          onPress={handleVerifyModeEmail}
        >
          <View style={styles.iconContainer}>
            <FontAwesome
              name="envelope"
              size={25}
              color={
                isSelectedModeEmail
                  ? defaultStyle.colors.mainColorBlue
                  : defaultStyle.colors.dark
              }
            />
          </View>
          <View style={styles.texts}>
            <Text style={styles.methodTitle}>Email</Text>
            <Text style={styles.descMethod}>Verificar com o seu email</Text>
          </View>
        </Pressable>
        <Pressable
          style={
            isSelectedModePhone
              ? [styles.pressItem, styles.pressItemSelected]
              : styles.pressItem
          }
          onPress={handleVerifyModePhone}
        >
          <View style={styles.iconContainer}>
            <FontAwesome
              name="phone"
              size={25}
              color={
                isSelectedModePhone
                  ? defaultStyle.colors.mainColorBlue
                  : defaultStyle.colors.dark
              }
            />
          </View>
          <View style={styles.texts}>
            <Text style={styles.methodTitle}>Número de Telefone</Text>
            <Text style={styles.descMethod}>
              Verificar com o seu número de telefone
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
