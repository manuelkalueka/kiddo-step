import React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard";
import { FontAwesome5 } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

import styles from "./styles";

const CreatePasswordScreen = ({ navigation }) => {
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
          <TextInput
            placeholder="Nova Senha"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <View style={[styles.inputContainer, styles.inputDefault]}>
          <FontAwesome5
            style={styles.inputIcon}
            name="lock"
            size={25}
            color={defaultStyle.colors.grayAccent1}
          />
          <TextInput
            placeholder="Confirmar Senha"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.MainButton}
          onPress={() => {
            navigation.navigate("VerifyId");
          }}
        >
          <Text style={styles.textButton}>Continuar</Text>
        </TouchableOpacity>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CreatePasswordScreen;
