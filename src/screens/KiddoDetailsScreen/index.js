import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import { StatusBar } from "expo-status-bar";
import { handleDisableKeyboard } from "../../utils/dismiss-keyboard";

const KiddoSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido!")
    .required("Informe o seu email por favor"),
  password: yup
    .string()
    .min(6, "Senha inválida!")
    .required("Informe a sua senha por favor"),
});

const KiddoDetailsScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(KiddoSchema),
  });

  const sendForm = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable
        style={styles.picContainer}
        onPress={() => handleDisableKeyboard(Keyboard)}
      >
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
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => navigation.navigate("Alertas")}
          >
            <Entypo name="plus" size={25} color={defaultStyle.colors.white} />
            <Text style={styles.textAction}>Definir Alerta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => navigation.navigate("Cerca")}
          >
            <Entypo name="cog" size={25} color={defaultStyle.colors.white} />
            <Text style={styles.textAction}>Nova Geo-cerca</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <Pressable
        style={styles.bodyContainer}
        onPress={() => handleDisableKeyboard(Keyboard)}
      >
        <View style={styles.InfoForm}>
          <View style={styles.inputContainer}>
            <FontAwesome5
              style={styles.inputIcon}
              name="user"
              size={25}
              color={defaultStyle.colors.grayAccent1}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Nome Completo"
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

          <View style={styles.containerTxtPassword}>
            <FontAwesome5 size={18.5} name="lock" color={"#a2c4e0"} />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.txtPassword}
                  placeholder="Senha"
                  secureTextEntry={true}
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
        </View>
      </Pressable>
    </View>
  );
};

export default KiddoDetailsScreen;
