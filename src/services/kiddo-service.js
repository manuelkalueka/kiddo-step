import ApiMananger from "./api";

import { useAuth } from "../contexts/auth";

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
    await ApiMananger.post(`/kiddo`, {
      fullName,
      surname,
      birthDate,
      gendre,
      avatar,
      bloodType,
      alergics,
      parent: user._id,
    });

    console.log("Kiddo Salva na DB");
  } catch (error) {
    console.log("Erro ao salvar criança ", error);
  }
}

async function editKiddoInfo(id, user, kiddoData) {
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
    await ApiMananger.put(`/kiddo/${id}`, {
      fullName,
      surname,
      birthDate,
      gendre,
      avatar,
      bloodType,
      alergics,
      parent: user._id,
    });
  } catch (error) {
    console.log("Erro ao Alterar dados da Criança ", error);
  }
}

export { getKiddoInfo, setKiddoInfo, editKiddoInfo };
