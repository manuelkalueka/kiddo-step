import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth"; // Supondo que você tenha um contexto de autenticação
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getKiddoInfo, setKiddoInfo } from "../services/kiddo-service";
const contextFormat = {
  setted: false,
  kiddo: {},
  getKiddo: () => {},
};
const KiddoContext = createContext(contextFormat);

export const KiddoProvider = ({ children }) => {
  const [kiddo, _setKiddo] = useState(null);
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
      } catch (error) {
        console.error("Erro ao obter informações do kiddo:", error);
      }
    };

    getKiddo();
  }, [user]);

  async function setKiddo(data) {
    try {
      const response = await setKiddoInfo(data, user);
      return response;
    } catch (error) {
      console.log("Erro ao guardar criança ", error);
    }
  }

  return (
    <KiddoContext.Provider
      value={{ setted: !!kiddo, kiddo, setKiddo, kiddoAge }}
    >
      {children}
    </KiddoContext.Provider>
  );
};

export const useKiddo = () => useContext(KiddoContext);
