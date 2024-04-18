import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenar dados em string no dispositivo
import { setKiddoInfo, getKiddoInfo } from "./../services/kiddo-service.js";
const contextFormat = {
  setted: true,
  kiddo: {},
  createKiddo: () => {},
  getKiddo: () => {},
};

const KiddoContext = createContext(contextFormat);

export const KiddoProvider = ({ children }) => {
  const [kiddo, setKiddo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      //Criar dentro do useEffect (Como Gambiarra)
      const storagedkiddo = await AsyncStorage.getItem("@Kiddo");

      if (storagedkiddo) {
        setKiddo(JSON.parse(storagedkiddo));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function createKiddo(kiddoData) {
    try {
      const response = await setKiddoInfo(kiddoData);
      await getKiddo(response._id);
    } catch (error) {
      console.log("ERRO NO CONTEXTO:", error);
    }
  }

  async function getKiddo(id) {
    try {
      const kiddo = await getKiddoInfo(id);
      setKiddo(kiddo);
      await AsyncStorage.setItem("@Kiddo", JSON.stringify(kiddo));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <KiddoContext.Provider
      value={{
        setted: !!kiddo,
        kiddo,
        createKiddo,
      }}
    >
      {children}
    </KiddoContext.Provider>
  );
};

export function useKiddo() {
  const context = useContext(KiddoContext);
  return context;
}

//AINDA NÃO FUNCIONA
