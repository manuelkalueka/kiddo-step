import React, { createContext, useContext, useEffect, useState } from "react";
import ApiMananger from "../services/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenar dados em string no dispositivo
import { signInService } from "./../services/auth-services.js";

const contextFormat = {
  signed: true,
  user: {},
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext(contextFormat);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      //Criar dentro do useEffect (Como Gambiarra)
      const storagedUser = await AsyncStorage.getItem("@KiddoStepAuth");
      const storagedToken = await AsyncStorage.getItem("@KiddoStepToken");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        ApiMananger.defaults.headers[
          "Authorization"
        ] = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);
  async function signIn(data) {
    const { email, password } = data;
    try {
      const response = await signInService(email, password);

      ApiMananger.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.token}`;

      setUser(response);
      await AsyncStorage.setItem(
        "@KiddoStepAuth",
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem("@KiddoStepToken", response.token);
    } catch (error) {
      console.log("ERRO NO CONTEXTO:", error);
    }
  }

  async function signUp() {}

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@KiddoStepAuth");
    await AsyncStorage.removeItem("@KiddoStepToken");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
