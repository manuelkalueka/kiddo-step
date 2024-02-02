import React,{ useState } from "react";

import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import {handleDisableKeyboard} from "../../utils/dismiss-keyboard"

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { styles } from "./style";
import defaultStyle from '../../defaultStyle'
import Title from "../../components/Title";

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

  const [showpassword, setShowPassword]= useState(true)

  // const dismissKeyboard = ()=>{
  //   Keyboard.dismiss()
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const sendForm = (data) => {
    console.log(data);
  };
  return (
    <TouchableWithoutFeedback onPress={()=>handleDisableKeyboard(Keyboard)}>
    <View style={styles.containerLogin}>

    <View style={styles.headerLogin}>
        <View>
          <Title title="Seja Bem-vindo" subtitle="Conecte-se"/>
        </View>
    </View>

      <View style={styles.containerInput}>

        <FontAwesome5 
        size={25} 
        name="envelope" 
        color={defaultStyle.colors.grayAccent1} 
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Email"
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
        color={defaultStyle.colors.grayAccent1} 
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              secureTextEntry={showpassword}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <TouchableOpacity style={styles.showpasswordIcon} onPress={()=>setShowPassword(!showpassword)}>
         {
          showpassword == true?(
            <Ionicons
              name="eye-off"
              size={25}
              color={defaultStyle.colors.grayAccent4}
            />
          ):(
            <Ionicons
              name="eye"
              size={25}
              color={defaultStyle.colors.grayAccent4}
            />
          )
         }
        </TouchableOpacity>

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

      <TouchableOpacity style={styles.containerForgotPassword}>
        <Text style={styles.textForgotPassword}>Esqueci a minha senha</Text>
      </TouchableOpacity>

      <View style={styles.containerNewAccount}>
        <Text style={styles.textDoYouNeed}>Deseja criar uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.textCreateAccount}> Criar</Text>
        </TouchableOpacity>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
}
