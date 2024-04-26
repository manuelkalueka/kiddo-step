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
    Alert.alert(error?.message, "Tente Novamente!");
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
    console.log(error);
    Alert.alert(error?.message, "Tente Novamente!");
  }
}

async function updateUserService(infoUser, user) {
  try {
    const { data, status } = await axios.get(
      `https://angolaapi.onrender.com/api/v1/validate/bi/${infoUser.identifyNumber}`
    );
    console.log("Resultado da Verificação do BI ", data);
    if (status === 200) {
      const { data } = await ApiMananger.post(
        `/user-info/${user._id}`,
        infoUser
      );
      return data;
    } else {
      Alert.alert("Inválido", "Verificar Identidade");
      return;
    }
  } catch (error) {
    console.log("Erro ao Actualizar o usuário", error);
  }
}

const confirmEmail = async (data) => {
  const { email } = data;
  try {
    //Comunicacação com Backend
    const response = await ApiMananger.post("/", { email });
  } catch (error) {
    console.log(error);
  }
};

export { signInService, signUpService, updateUserService, confirmEmail };
