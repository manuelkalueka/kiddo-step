import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Pressable,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { RadioButton } from "react-native-paper";
import styles from "./styles";

import Title from "../../components/shared/Title";
import defaultStyle from "../../defaultStyle";

export default function Signup({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (isFocused) setIsFocused(false);
    else setIsFocused(true);
  };

  const handleDisableKeyboard = () => Keyboard.dismiss();

  // const {Item, Group} = RadioButton
  return (
    <View style={styles.loginContainer}>
      <Pressable onPress={handleDisableKeyboard}>
        <View style={styles.titleContainer}>
          <Title title="Junta-se a Nós" subtitle="Criar uma conta" />
        </View>
        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : styles.inputDefault,
          ]}
        >
          <FontAwesome
            style={styles.inputIcon}
            name="user"
            size={25}
            color={defaultStyle.colors.grayAccent1}
          />
          <TextInput
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Nome Completo"
            style={styles.input}
            keyboardType="default"
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : styles.inputDefault,
          ]}
        >
          <FontAwesome
            style={styles.inputIcon}
            name="envelope"
            size={20}
            color={defaultStyle.colors.grayAccent1}
          />
          <TextInput
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Email"
            style={[
              styles.input,
              isFocused ? styles.inputFocused : styles.inputDefault,
            ]}
            keyboardType="email-address"
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : styles.inputDefault,
          ]}
        >
          <FontAwesome
            style={styles.inputIcon}
            name="lock"
            size={25}
            color={defaultStyle.colors.grayAccent1}
          />
          <TextInput
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Senha"
            style={[
              styles.input,
              isFocused ? styles.inputFocused : styles.inputDefault,
            ]}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.MainButton}
          onPress={() => {
            navigation.navigate("VerifyId");
          }}
        >
          <Text style={styles.textButton}>Registar</Text>
        </TouchableOpacity>
      </Pressable>

      <Pressable
        onPress={handleDisableKeyboard}
        style={styles.haveAccountContainer}
      >
        <Text style={styles.haveAccountText}>Já tem uma conta?</Text>
        <TouchableOpacity
          style={styles.buttonAction}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.haveAccounAction}>Entrar</Text>
        </TouchableOpacity>
      </Pressable>
      {/* <View>
     <Group>
      <Item label="Eu li e concordo com as Políticas de Privacidade"/>
     </Group>
     </View> */}
    </View>
  );
}
