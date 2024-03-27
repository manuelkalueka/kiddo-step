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

async function signUpService() {

  try {
    
  } catch (error) {
    Alert.alert(error?.message, "Tente Novamente!");
  }
}

export { signInService, signUpService };
