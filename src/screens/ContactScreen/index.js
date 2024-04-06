import React, { useState } from "react";
import {
  View,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import ActionButtom from "../../components/ActionButtom";
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";

const Schema = yup.object({
  name: yup.string().required("Informe um nome de identificação"),
  address: yup.string().required("Informe um enderenco"),
  contact: yup.string().required("Informe contacto para o destino"),
});

const contactList = [
  {
    name: "Manuel",
    address: "Mbemba Ngango Rua J",
    contact: "933808188",
  },

  {
    name: "Manuel",
    address: "Mbemba Ngango Rua J",
    contact: "933808187",
  },
];

const ContactScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = async (data) => {
    //Salvar os Dados e Voltar no Mapa
    handleCloseModal();
  };

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleOpenModal}>
          <FontAwesome5
            name="plus"
            color={defaultStyle.colors.mainColorBlue}
            size={25}
          />
          <Text>Adicionar Contactos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contactList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => Number(item.contact)}
        renderItem={(item) => (
          <TouchableOpacity>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.contact}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal presentationStyle="pageSheet" visible={visible}>
        <Pressable
          style={styles.container}
          onPress={() => handleDisableKeyboard(Keyboard)}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: "5%" }}
          >
            Adicionar Contactos de Emergência
          </Text>
          <Text style={styles.label}>Nome</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Text style={styles.label}>Enderenço</Text>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Text style={styles.label}>Contacto</Text>
          <Controller
            name="contact"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                keyboardType="phone-pad"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ActionButtom
            textButton="Adicionar"
            onPress={handleSubmit(sendForm)}
          />
        </Pressable>
      </Modal>
    </View>
  );
};

export default ContactScreen;
