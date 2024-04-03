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
    .required("Nome é obrigatório")
    .test("fullName", "Insira um nome completo válido", (value) => {
      // Verifica se o valor contém pelo menos um espaço em branco
      return /\s/.test(value);
    }),
  phone: yup
    .string()
    .required("O número de telefone é obrigatório")
    .matches(/^[29]\d{8}$/, "Insira um número de telefone válido"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

function Signup({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    const { fullName, email, phone } = data;
    navigation.navigate("CreatePassword", { fullName, email, phone });
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Nome Completo"
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          {errors.fullName && (
            <Text style={styles.msgAlerta}>{errors.fullName?.message}</Text>
          )}
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
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  style={[styles.input]}
                  keyboardType="email-address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.msgAlerta}>{errors.email?.message}</Text>
          )}
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
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Número de Telefone"
                  style={[styles.input]}
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.MainButton}
            onPress={handleSubmit(sendForm)}
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
