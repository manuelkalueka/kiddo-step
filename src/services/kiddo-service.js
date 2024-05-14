import { Platform } from "react-native";
import ApiMananger from "./api";

async function getKiddoInfo(user) {
  try {
    const { data } = await ApiMananger.get(`/kiddo/${user._id}`);
    return data;
  } catch (error) {
    console.log("Erro ao Buscar criança ", error);
  }
}

async function setKiddoInfo(kiddoData, user) {
  try {
    const {
      fullName,
      surname,
      birthDate,
      gendre,
      avatar,
      bloodType,
      alergics,
    } = kiddoData;
    const response = await ApiMananger.post(`/kiddo`, {
      fullName,
      surname,
      birthDate:
        Platform.OS === "android" ? new Date(birthDate.trim()) : birthDate,
      gendre,
      avatar,
      bloodType,
      alergics,
      parent: user._id,
    });

    return response;
  } catch (error) {
    console.log("Erro ao salvar criança ", error);
  }
}

async function editKiddoInfo(id, kiddoData) {
  try {
    const { fullName, gendre, bloodType, alergics, surname,birthDate } = kiddoData;
    const { data } = await ApiMananger.put(`/kiddo/${id}`, {
      fullName,
      surname,
      birthDate,
      gendre,
      bloodType,
      alergics,
    });
    return data;
  } catch (error) {
    console.log("Erro ao Alterar dados da Criança ", error);
  }
}

export { getKiddoInfo, setKiddoInfo, editKiddoInfo };
