import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth"; // Supondo que você tenha um contexto de autenticação
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getKiddoInfo } from "../services/kiddo-service";
const contextFormat = {
  setted: false,
  kiddo: {},
  getKiddo: () => {},
};
const KiddoContext = createContext(contextFormat);

export const KiddoProvider = ({ children }) => {
  const [kiddo, setKiddo] = useState(null);
  const { user } = useAuth(); // Obtendo o usuário do contexto de autenticação

  // Função para obter o "kiddo" da base de dados e salvar no AsyncStorage
  const getKiddo = async () => {
    try {
      const data = await getKiddoInfo(user);
      setKiddo(data);
      await AsyncStorage.setItem("kiddoData", JSON.stringify(data)); // Salvar no AsyncStorage
    } catch (error) {
      console.error("Erro ao obter informações do kiddo:", error);
    }
  };

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("kiddoData"); // Tentar obter dados salvos do AsyncStorage
        if (savedData) {
          setKiddo(JSON.parse(savedData)); // Definir os dados salvos como estado local
        } else {
          getKiddo(); // Se não houver dados salvos, buscar da base de dados
        }
      } catch (error) {
        console.error("Erro ao carregar dados salvos do AsyncStorage:", error);
      }
    };

    if (user) {
      loadSavedData(); // Carregar os dados salvos do AsyncStorage quando o usuário estiver disponível
    }
  }, [user]);

  return (
    <KiddoContext.Provider value={{ setted: !!kiddo, kiddo }}>
      {children}
    </KiddoContext.Provider>
  );
};

export const useKiddo = () => useContext(KiddoContext);
