import React, { useEffect, useState } from "react";
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
import { getContacts, setContacts } from "../../services/user-service";

const Schema = yup.object({
  name: yup.string().required("Informe um nome de identificação"),
  address: yup.string().required("Informe um enderenco"),
  phone: yup.string().required("Informe contacto para o destino"),
});

const ContactScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    async function getCont() {
      try {
        const contacts = await getContacts();
        setContactList(contacts);
      } catch (error) {
        console.log("Erro ao Carregar os Contactos");
      }
    }

    getCont();
  }, []);

  const sendForm = async (data) => {
    //Salvar os Dados e Voltar na Lista
    await setContacts(data);
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
      <View style={styles.top}>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", paddingVertical: "5%" }}
        >
          Contactos de Emergência
        </Text>

        <TouchableOpacity
          onPress={handleOpenModal}
          style={styles.buttonAdContact}
          accessible={true}
          accessibilityLabel="Abrir modal"
        >
          <FontAwesome5
            name="plus"
            color={defaultStyle.colors.blueDarkColor3}
            size={18}
          />
          <Text style={{ fontWeight: "bold", paddingLeft: 5, opacity: 0.4 }}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contactList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactContainer}>
            <Text style={styles.labelName}>{item.name}</Text>
            <Text style={styles.labelAddress}>{item.address}</Text>
            <Text style={styles.labelPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => handleCloseModal()}
        accessible={true}
        accessibilityLabel="Modal"
      >
        <Pressable
          style={styles.containerModal}
          onPress={() => handleDisableKeyboard(Keyboard)}
        >
          <View style={{ paddingBottom: 40 }}>
            <TouchableOpacity
              onPress={() => handleCloseModal()}
              accessible={true}
              accessibilityLabel="Fechar modal"
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
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
          {errors.name && (
            <Text style={styles.msgAlerta}>{errors.name?.message}</Text>
          )}
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
          {errors.address && (
            <Text style={styles.msgAlerta}>{errors.address?.message}</Text>
          )}
          <Text style={styles.label}>Contacto</Text>
          <Controller
            name="phone"
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
          {errors.phone && (
            <Text style={styles.msgAlerta}>{errors.phone?.message}</Text>
          )}
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
