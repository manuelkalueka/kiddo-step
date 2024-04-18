import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/auth";

import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import ActionButtom from "../../components/ActionButtom";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setKiddoInfo } from "../../services/kiddo-service";

const Schema = yup.object({
  fullName: yup
    .string()
    .required("Nome é obrigatório")
    .test("fullName", "Insira um nome completo válido", (value) => {
      // Verifica se o valor contém pelo menos um espaço em branco
      return /\s/.test(value);
    }),
  surname: yup.string(),
  birthDate: yup.date().required("Data de Nascimento Obrigatório"),
  gendre: yup.string(),
  avatar: yup.string(),
  bloodType: yup.string(),
  alergics: yup.string(),
  // identifyNumber: yup
  //   .string()
  //   .required("BI Obrigatório")
  //   .min(6, "Número do Bilhete Inválido"),
  // address: yup.string().required("Define um Endereço, como Casa..."),
  // relationship: yup.string(),
});

const ConfigKiddoScreen = () => {
  const { user, updateUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birthDate: new Date(),
      gendre: "Masculino",
      relationship: "Pai",
    },
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    try {
      const {
        fullName,
        surname,
        birthDate,
        gendre,
        avatar,
        bloodType,
        alergics,
        identifyNumber,
        address,
        relationship,
      } = data;

      console.log("SOU O GENERO NO FRONT ", gendre);
      const AuthData = { identifyNumber, address, relationship };
      const kiddoData = {
        fullName,
        surname,
        birthDate,
        gendre,
        avatar,
        bloodType,
        alergics,
      };
      await setKiddoInfo(kiddoData, user);
      // await updateUser(AuthData);
    } catch (error) {
      console.log("Erro ao concluir a configuração da conta ", error);
    }
  };

  const pickerRef = useRef();
  const pickerGenRef = useRef();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <Text style={styles.warnTitle}>Seja Bem Vindo {user?.fullName}</Text>
        <Text style={styles.textCall}>
          Termine de Configurar seus dados e do seu Kiddo, para começar a
          Rastrear...
        </Text>
      </View>
      <Pressable style={styles.keyZone}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "height" : "padding"}
        > */}
        {/* <View>
        <View>
          <Text style={styles.mainLabel}>Dados do Responsável</Text>
          <Text style={styles.label}>Número do BI</Text>
          <Controller
            name="identifyNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite o número do BI"
                style={styles.textInput}
              />
            )}
          />
          {errors.identifyNumber && (
            <Text style={styles.msgAlerta}>
              {errors.identifyNumber?.message}
            </Text>
          )}
          <Text style={styles.label}>Endereço de Casa</Text>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite o endereço de Casa"
                style={styles.textInput}
              />
            )}
          />
          {errors.address && (
            <Text style={styles.msgAlerta}>{errors.address?.message}</Text>
          )}

          <Text style={styles.label}>Relação com Criança</Text>
          <Controller
            name="relationship"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                ref={pickerRef}
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
                style={styles.textInput}
                itemStyle={{
                  height: 50,
                }}
              >
                <Picker.Item key={0} label="Pai" value="Pai" />
                <Picker.Item key={1} label="Mãe" value="mae" />
                <Picker.Item key={2} label="Responsável" value="responsavel" />
                <Picker.Item key={3} label="Irmão(ã)" value="Irmão" />

                <Picker.Item key={4} label="Tio(a)" value="Tio" />
              </Picker>
            )}
          />
        </View> */}
        <View>
          <Text style={styles.mainLabel}>Dados da Criança</Text>
        </View>
        <Text style={styles.label}>Nome Completo</Text>

        <Controller
          name="fullName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Nome Completo"
              style={styles.textInput}
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.msgAlerta}>{errors.fullName?.message}</Text>
        )}
        <Text style={styles.label}>Alcunha</Text>

        <Controller
          name="surname"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Alcunha"
              style={styles.textInput}
            />
          )}
        />
        <Text style={styles.label}>Data de Nascimento</Text>

        <Controller
          name="birthDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || value;
                onChange(currentDate);
              }}
              style={styles.textInput}
            />
          )}
        />
        <Text style={styles.label}>Género</Text>

        <Controller
          name="gendre"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              ref={pickerGenRef}
              selectedValue={value || "Masculino"}
              onValueChange={onChange}
              onBlur={onBlur}
              style={styles.textInput}
              itemStyle={{
                height: Platform.OS === "ios" ? 50 : "auto",
              }}
            >
              <Picker.Item key={0} label="Masculino" value="Masculino" />
              <Picker.Item key={1} label="Feminino" value="Feminino" />
            </Picker>
          )}
        />
        <Text style={styles.label}>Tipo Sanguíneo</Text>

        <Controller
          name="bloodType"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Tipo Sanguíneo"
              style={styles.textInput}
            />
          )}
        />
        <Text style={styles.label}>Alergias</Text>
        <Controller
          name="alergics"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Possíveis alergias ou restrições de Saúde"
              style={styles.textInput}
            />
          )}
        />
        <ActionButtom
          textButton="Começar a Rastrear"
          onPress={handleSubmit(sendForm)}
        />
        {/* </KeyboardAvoidingView> */}
      </Pressable>
    </ScrollView>
  );
};

export default ConfigKiddoScreen;
