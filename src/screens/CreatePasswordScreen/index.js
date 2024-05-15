import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/auth";

import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

import styles from "./styles";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup.object({
  password: yup
    .string()
    .min(6, "Insira uma senha com 6 caracteres no mínimo")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      "Senha Inválida (Deve ter letras Maiusculas, Minusculas e Números)"
    )
    .required("Senha é obrigatória"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas devem iguais")
    .required("Confirme sua senha"),
});

const CreatePasswordScreen = ({ route, navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    const { params } = route;
    const { fullName, email, phone } = params;
    const { password } = data;
    await signUp({ fullName, email, password, phone });
    Alert.alert("Sucesso", "OK!"); //ToDo quando apertar Ok Muda de Tela
    navigation.navigate("Login");
  };

  let { signUp } = useAuth();
  const [showpassword, setShowPassword] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={() => handleDisableKeyboard(Keyboard)}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Criar uma nova Senha</Text>
          <Text style={styles.subtitle}>
            A sua nova senha deve ser diferente das senhas anteriores
          </Text>
        </View>
        <View style={[styles.inputContainer, styles.inputDefault]}>
          <FontAwesome5
            style={styles.inputIcon}
            name="lock"
            size={25}
            color={defaultStyle.colors.mainColorBlue}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nova Senha"
                style={styles.input}
                secureTextEntry={showpassword}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
            <Feather
              size={25}
              name={!showpassword ? "eye" : "eye-off"}
              color={defaultStyle.colors.mainColorBlue}
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.msgAlerta}>{errors.password?.message}</Text>
        )}
        <View style={[styles.inputContainer, styles.inputDefault]}>
          <FontAwesome5
            style={styles.inputIcon}
            name="lock"
            size={25}
            color={defaultStyle.colors.mainColorBlue}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Confirmar Senha"
                style={styles.input}
                secureTextEntry={showpassword}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showpassword)}>
            <Feather
              size={25}
              name={!showpassword ? "eye" : "eye-off"}
              color={defaultStyle.colors.mainColorBlue}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles.msgAlerta}>
            {errors.confirmPassword?.message}
          </Text>
        )}
        <TouchableOpacity
          style={styles.MainButton}
          onPress={handleSubmit(sendForm)}
        >
          <Text style={styles.textButton}>Continuar</Text>
        </TouchableOpacity>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CreatePasswordScreen;
