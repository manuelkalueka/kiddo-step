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

export { signInService, signUpService };
