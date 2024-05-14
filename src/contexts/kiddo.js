import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth"; // Supondo que você tenha um contexto de autenticação
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  editKiddoInfo,
  getKiddoInfo,
  setKiddoInfo,
} from "../services/kiddo-service";
const contextFormat = {
  setted: true,
  kiddo: {},
  getKiddo: () => {},
  // setKiddo: () => {},
  kiddoAge: 0,
};
const KiddoContext = createContext(contextFormat);

export const KiddoProvider = ({ children }) => {
  const [kiddo, _setKiddo] = useState(null);
  const [hasKiddo, setHasKiddo] = useState(false);
  const [kiddoAge, setKiddoAge] = useState(null);
  const { user } = useAuth(); // Obtendo o usuário do contexto de autenticação

  useEffect(() => {
    function getAge() {
      const birthDate = new Date(kiddo?.birthDate);
      const birthYear = birthDate.getFullYear();
      const dataActual = new Date();
      const anoActual = dataActual.getFullYear();
      const idade = anoActual - birthYear;
      setKiddoAge(idade);
    }
    getAge();
  }, [kiddo]);

  useEffect(() => {
    // Função para obter o "kiddo" da base de dados e salvar no AsyncStorage
    const getKiddo = async () => {
      try {
        const data = await getKiddoInfo(user);
        _setKiddo(data);
        await AsyncStorage.setItem("@kiddo", JSON.stringify(data)); // Salvar no AsyncStorage
        if (data) {
          setHasKiddo(true);
        }
      } catch (error) {
        console.error("Erro ao obter informações do kiddo:", error);
      }
    };

    getKiddo();
  }, [user]);

  async function setKiddo(data, user) {
    try {
      const response = await setKiddoInfo(data, user);
      _setKiddo(response.data);
      if (response.data) {
        setHasKiddo(true);
      }
      return response;
    } catch (error) {
      console.log("Erro ao guardar criança ", error);
    }
  }

  async function editUser(data) {
    try {
      const newKiddo = await editKiddoInfo(kiddo._id, data);
      _setKiddo(newKiddo);
      await AsyncStorage.setItem("@kiddo", JSON.stringify(newKiddo)); // Salvar no AsyncStorage
    } catch (error) {
      console.log("Erro no contexto editar criança ", error);
    }
  }

  return (
    <KiddoContext.Provider
      value={{ setted: hasKiddo, kiddo, setKiddo, kiddoAge, editUser }}
    >
      {children}
    </KiddoContext.Provider>
  );
};

export const useKiddo = () => useContext(KiddoContext);
