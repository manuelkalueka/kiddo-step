import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useAuth } from "../../contexts/auth";

import { handleDisableKeyboard } from "../../utils/dismiss-keyboard";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "./style";
import defaultStyle from "../../defaultStyle";

const Schema = yup.object({
  email: yup
    .string()
    .email("Email inválido!")
    .required("Informe o seu email por favor"),
  password: yup
    .string()
    .min(6, "Senha inválida!")
    .required("Informe a sua senha por favor"),
});

export default function Login({ navigation }) {
  const [showpassword, setShowPassword] = useState(true);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    signIn(data);
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleDisableKeyboard(Keyboard)}>
      <View style={styles.containerLogin}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS == "ios" ? "height" : "padding"}
        >
          <View style={styles.headerLogin}>
            <Image
              style={styles.imageLogin}
              source={require("../../../assets/img/login-image.jpg")}
              resizeMode="cover"
            />
          </View>

          <View style={styles.form}>
            <View style={styles.containerInput}>
              <FontAwesome5
                size={25}
                name="envelope"
                color={defaultStyle.colors.mainColorBlue}
              />

              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="email-address"
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor={"#0009"}
                    autoCapitalize="none"
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
            <View style={styles.containerInput}>
              <FontAwesome5
                size={25}
                name="lock"
                color={defaultStyle.colors.mainColorBlue}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Senha"
                    placeholderTextColor={"#0009"}
                    secureTextEntry={showpassword}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={styles.msgAlerta}>{errors.password?.message}</Text>
            )}

            <TouchableOpacity
              style={styles.buttonSigIn}
              onPress={handleSubmit(sendForm)}
            >
              <Text style={styles.TextSigIn}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerForgotPassword}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.textForgotPassword}>
                Esqueci a minha senha
              </Text>
            </TouchableOpacity>

            <View style={styles.containerNewAccount}>
              <Text style={styles.textDoYouNeed}>Deseja criar uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.textCreateAccount}> Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
