import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../contexts/auth";

import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import defaultStyle from "../../defaultStyle";

import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./styles";

import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import ActionButton from "../../components/ActionButtom";

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

const AccountScreen = ({ navigation }) => {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    navigation.goBack();
  };
  const parentAvatar = require("./../../../assets/img/avatar-parent-man.png");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            paddingTop: 30,
            paddingBottom: 30,
          }}
          onPress={handleDisableKeyboard(Keyboard)}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.avatarContainer}>
              <Image source={parentAvatar} style={styles.avatar} />
              <TouchableOpacity>
                <Text style={styles.changePicLabel}>Trocar de Foto</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.label}>Nome Completo</Text>
          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="user"
              size={25}
              color={defaultStyle.colors.mainColorBlue}
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
                  defaultValue={user?.fullName}
                  value={value}
                />
              )}
            />
          </View>
          {errors.fullName && (
            <Text style={styles.msgAlerta}>{errors.fullName?.message}</Text>
          )}
          <Text style={styles.label}>Email</Text>

          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="envelope"
              size={20}
              color={defaultStyle.colors.mainColorBlue}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  style={[styles.input]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  defaultValue={user?.email}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.msgAlerta}>{errors.email?.message}</Text>
          )}
          <Text style={styles.label}>Número de Telefone</Text>

          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="phone"
              size={20}
              color={defaultStyle.colors.mainColorBlue}
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
                  defaultValue={user?.phone}
                  value={value}
                />
              )}
            />
          </View>
          <Text style={styles.label}>Número de Identidade</Text>

          <View style={[styles.inputContainer, styles.inputDefault]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="id-card"
              size={20}
              color={defaultStyle.colors.mainColorBlue}
            />
            <Controller
              name="identifyNumber"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Número de Identidade"
                  style={[styles.input]}
                  keyboardType="name-phone-pad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  defaultValue={user?.identifyNumber}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Alterar Senha</Text>
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
                    keyboardType="visible-password"
                    style={styles.input}
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
                    keyboardType="visible-password"
                    secureTextEntry={true}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.msgAlerta}>
                {errors.confirmPassword?.message}
              </Text>
            )}
          </View>
          <ActionButton
            textButton="Salvar Alterações"
            onPress={handleSubmit(sendForm)}
          />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccountScreen;
