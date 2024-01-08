import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "./styles";

import Title from "../../components/shared/Title";
export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignin(data) {
    console.log(data);
  }

  return (
    <View style={styles.containerLogin}>
      <Title title="Seja Bem-Vindo!" subtitle="Entra na sua conta" />
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              placeholder="Digite seu Email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              placeholder="Digite sua Senha"
            />
          )}
        />
        <TouchableOpacity onPress={handleSubmit(handleSignin)}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Esqueceu a senha</Text>
      </View>
      <View>
        <Text>
          Não tem um conta?<Text>Criar Conta</Text>
        </Text>
      </View>
    </View>
  );
}
