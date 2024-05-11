import React, { createContext, useContext, useEffect, useState } from "react";
import ApiMananger from "../services/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenar dados em string no dispositivo
import {
  signInService,
  signUpService,
  updateUserService,
} from "./../services/auth-services.js";
import { getInfo } from "../services/user-service.js";

const contextFormat = {
  signed: false,
  user: {},
  isActive: false,
  signIn: () => {},
  signOut: () => {},
  signOut: () => {},
};

const AuthContext = createContext(contextFormat);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      //Criar dentro do useEffect (Como Gambiarra)
      try { 
        const storagedUser = await AsyncStorage.getItem("@KiddoStepAuth");
        const storagedToken = await AsyncStorage.getItem("@KiddoStepToken");

        if (storagedUser && storagedToken) {
          setUser(JSON.parse(storagedUser));
          ApiMananger.defaults.headers["x-access-token"] = `${storagedToken}`;
          const myUser = JSON.parse(storagedUser);
          const newUser = await getInfo(myUser);
          if (newUser.isActive === true) {
            setIsActive(true);
          }
          // await AsyncStorage.removeItem("@KiddoStepAuth");
          await AsyncStorage.setItem("@KiddoStepAuth", JSON.stringify(newUser));
        }
        setLoading(false);
      } catch (error) {
        console.log(
          "Erro ao carregar informações do Usuário no CONTEXT ",
          error
        );
      }
    }

    loadStorageData();
  }, []);

  async function signIn(data) {
    const { email, password } = data;
    try {
      const response = await signInService(email, password);
      await AsyncStorage.setItem(
        "@KiddoStepAuth",
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem("@KiddoStepToken", response.token);

      if (response.user.isActive === true) {
        setIsActive(true);
      }
      ApiMananger.defaults.headers["x-access-token"] = `${response.token}`;
    } catch (error) {
      console.log("ERRO NO CONTEXTO:", error);
    }
  }

  async function signUp({ fullName, email, password, phone }) {
    const response = await signUpService({ fullName, email, password, phone });
    return response;
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@KiddoStepAuth");
    await AsyncStorage.removeItem("@KiddoStepToken");
  }

  async function updateUser(data) {
    try {
      const response = await updateUserService(data, user);
      if (response.data.isActive === true) {
        setIsActive(true);
        await AsyncStorage.removeItem("@KiddoStepAuth");
        await AsyncStorage.setItem(
          "@KiddoStepAuth",
          JSON.stringify(response.data)
        );
      }
      return response;
    } catch (error) {
      console.log("Erro ao Actualizar o usuário ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user: user,
        isActive,
        signIn,
        signOut,
        signUp,
        loading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
