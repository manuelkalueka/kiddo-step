import axios from "axios";
import ApiMananger from "./api";
import { Alert } from "react-native";

async function signInService(email, password) {
  const reqUser = { email, password };
  try {
    //LOGICA PARA MANDAR NA API
    const { data } = await ApiMananger.post("/users/login", reqUser);

    const { user, token } = data;
    return { user, token };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Alert.alert("Verifique o Email e/ou Senha", "Tente Novamente!");
      }
    } else if (error.request) {
      Alert.alert(error?.message, "Tente Novamente!");
      console.log(error.request);
    } else {
      Alert.alert(error?.message, "Tente Novamente!");
      console.log("Error", error.message);
    }
  }
}

async function signUpService({ fullName, email, password, phone }) {
  const reqUser = {
    fullName,
    email,
    password,
    phone,
  };
  try {
    const response = await ApiMananger.post("/users/register", reqUser);
    if (response.status === 201) {
      return !!response.data;
    }
    Alert.alert("Erro ao Cadastro", "Tente Novamente!");
    return false;
  } catch (error) {
    Alert.alert(error?.message, "Tente Novamente!");
  }
}

async function updateUserService(infoUser, user) {
  try {
    // const { data, status } = await axios.get(
    //   `https://angolaapi.onrender.com/api/v1/validate/bi/${infoUser.identifyNumber}`
    // );
    // console.log("Resultado da Verificação do BI ", data);
    const response = await ApiMananger.put(`/users/edit/${user._id}`, infoUser);
    return response;
  } catch (error) {
    console.log("Erro ao Actualizar o usuário", error);
  }
}

const confirmEmail = async (data) => {
  const { email } = data;
  try {
    //Comunicacação com Backend
    const response = await ApiMananger.post(`/users/find/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { signInService, signUpService, updateUserService, confirmEmail };
