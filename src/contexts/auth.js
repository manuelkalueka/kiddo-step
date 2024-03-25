import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenar dados em string no dispositivo
import { signInService } from "./../services/auth-services.js";
import api from "../services/api.js";
import { Alert } from "react-native";
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
        api.defaults.headers["x-access-token"] = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);
  async function signIn(email, password) {
    try {
      const response = await signInService(email, password);

      setUser(response.user);
      api.defaults.headers["x-access-token"] = `Bearer ${response.token}`;
      await AsyncStorage.setItem(
        "@KiddoStepAuth",
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem("@KiddoStepToken", response.token);
    } catch (error) {
      Alert.alert("Credenciais Inválidas", "Tente Novamente!");
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@KiddoStepAuth");
    await AsyncStorage.removeItem("@KiddoStepToken");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
