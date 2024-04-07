import { Alert } from "react-native";
import ApiMananger from "./api";

async function getContacts() {
  try {
    const { data } = await ApiMananger.get("/contacts");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function setContacts(data) {
  try {
    await ApiMananger.post("/contacts", data);
  } catch (error) {
    Alert.alert("Ocorreu um erro", "Por Favor Tente Novamente!");
  }
}

export { getContacts, setContacts };
