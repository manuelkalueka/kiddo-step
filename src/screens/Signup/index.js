import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import defaultStyle from "../../defaultStyle";

import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import styles from "./styles";

import Title from "../../components/Title";

const Schema = yup.object({
  fullName: yup
    .string()
    .required("O nome completo é obrigatório")
    .test("fullName", "Insira um nome completo válido", (value) => {
      // Verifica se o valor contém pelo menos um espaço em branco
      return /\s/.test(value);
    }),
  email: yup
    .string()
    .email("Informe um email válido!")
    .required("Informe o seu email por favor"),
  phone: yup
    .string()
    .required("O número de telefone é obrigatório")
    .matches(/^[29]\d{8}$/, "Insira um número de telefone válido"),
});

function Signup({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            handleDisableKeyboard(Keyboard);
          }}
        >
          <View style={styles.titleContainer}>
            <Title title="Junta-se a Nós" subtitle="Criar uma conta" />
          </View>
          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="user"
              size={25}
              color={
                isFocused
                  ? defaultStyle.colors.grayAccent1
                  : defaultStyle.colors.mainColorBlue
              }
            />
            <TextInput placeholder="Nome Completo" style={styles.input} />
          </View>
          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="envelope"
              size={20}
              color={
                isFocused
                  ? defaultStyle.colors.grayAccent1
                  : defaultStyle.colors.mainColorBlue
              }
            />
            <TextInput
              placeholder="Email"
              style={[styles.input]}
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="phone"
              size={20}
              color={
                isFocused
                  ? defaultStyle.colors.grayAccent1
                  : defaultStyle.colors.mainColorBlue
              }
            />
            <TextInput
              placeholder="Número de Telefone"
              style={[styles.input]}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.MainButton}
            onPress={() => {
              navigation.navigate("CreatePassword");
            }}
          >
            <Text style={styles.textButton}>Registar</Text>
          </TouchableOpacity>
        </Pressable>

        <Pressable
          onPress={handleDisableKeyboard}
          style={styles.haveAccountContainer}
        >
          <Text style={styles.haveAccountText}>Já tem uma conta?</Text>
          <TouchableOpacity
            style={styles.buttonAction}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.haveAccounAction}>Entrar</Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Signup;
