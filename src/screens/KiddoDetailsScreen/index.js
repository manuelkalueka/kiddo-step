import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";
import { StatusBar } from "expo-status-bar";
import { handleDisableKeyboard } from "../../utils/dismiss-keyboard";

const KiddoSchema = yup.object({
  fullName: yup.string().required("Informe o Nome Completo"),
  gender: yup.string().required("Informe o Genero"),
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

  const STATUS_DEVICE = true;

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
            <View style={styles.buttonStatusContainer}>
              <View
                style={[
                  styles.buttonStatusIcon,
                  {
                    backgroundColor:
                      STATUS_DEVICE === true
                        ? defaultStyle.colors.success
                        : defaultStyle.colors.grayAccent3,
                  },
                ]}
              ></View>
              <Text style={styles.textStatus}>
                {STATUS_DEVICE === true ? "online" : "offline"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => navigation.navigate("Alertas")}
          >
            <MaterialIcons
              name="add-alert"
              size={25}
              color={defaultStyle.colors.white}
            />
            <Text style={styles.textAction}>Definir Alerta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionItem]}
            onPress={() => navigation.navigate("Cerca")}
          >
            <MaterialIcons
              name="add-location-alt"
              size={25}
              color={defaultStyle.colors.white}
            />
            <Text style={styles.textAction}>Nova Geo-cerca</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <ScrollView style={styles.bodyDetails}>
        <View>
          <View>
            <Text style={styles.labels}>Nome Completo</Text>
            <TextInput
              placeholder="Digite o Nome Completo"
              value="TIAGO LUIS PEREIRA"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.labels}>Data de Nascimento</Text>
            <TextInput value="TIAGO LUIS PEREIRA" style={styles.input} />
          </View>
          <View>
            <Text style={styles.labels}>Gênero</Text>
            <TextInput value="Masculino" style={styles.input} />
          </View>
          <Text style={styles.sectionTitle}>Detalhes de Saúde</Text>
          <View>
            <Text style={styles.labels}>Tipo Sanguíneo</Text>
            <TextInput
              placeholder="Digite o tipo sanguíneo"
              value="A+"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.labels}>Alergias</Text>
            <TextInput
              placeholder="Descreve as Alergias e Restrições"
              multiline={true}
              editable={true}
              numberOfLines={4}
              value="TIAGO LUIS PEREIRA"
              style={styles.input}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.MainButton}>
            <Text style={styles.textButton}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default KiddoDetailsScreen;
